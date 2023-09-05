<?php

namespace Hetic\Behat;

use App\Security\ApiUserProvider;
use Assert\Assertion;
use Assert\AssertionFailedException as AssertionFailure;
use Behat\Behat\Hook\Scope\AfterScenarioScope;
use Behat\Behat\Hook\Scope\BeforeScenarioScope;
use Behat\Behat\Hook\Scope\ScenarioScope;
use Behat\Behat\Tester\Exception\PendingException;
use Behat\Gherkin\Node\PyStringNode;
use Behat\Gherkin\Node\TableNode;
use Doctrine\ORM\EntityManagerInterface;
use Imbo\BehatApiExtension\ArrayContainsComparator;
use Imbo\BehatApiExtension\Context\ArrayContainsComparatorAwareContext;
use Imbo\BehatApiExtension\Exception\AssertionFailedException;
use InvalidArgumentException;
use RuntimeException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\HttpKernel\KernelInterface;

abstract class KernelApiContext implements ArrayContainsComparatorAwareContext
{
    protected const TAG_READ_ONLY = 'read-only';
    protected const NO_RESPONSE_YET = 'The request has not been made yet, so no response object exists.';
    /**
     * Instance of the comparator that handles matching of JSON.
     */
    protected ArrayContainsComparator $arrayContainsComparator;
    /** @var array <string, string> */
    protected array $multiFormParameters = [];
    /** @var array <string, mixed> */
    protected array $files = [];

    protected string|null $content = null;
    protected EntityManagerInterface $entityManager;
    /** @var array<string, string> */
    protected array $header = [
        'HTTP_HOST' => 'localhost:1234',
        'CONTENT_TYPE' => 'application/ld+json',
        'HTTP_ACCEPT' => 'application/ld+json',
    ];
    protected ?Request $request = null;
    protected ?Response $response = null;
    /** @var array<string, string> */
    protected array $queryParameter = [];

    public function __construct(
        private readonly KernelInterface $kernel,
        protected ApiUserProvider $apiUserProvider,
    ) {
        /* @phpstan-ignore-next-line */
        $this->entityManager = $this->kernel->getContainer()->get('doctrine.orm.default_entity_manager');
    }

    /**
     * @When a demo scenario sends a request to :path
     */
    public function aDemoScenarioSendsARequestTo(string $path): void
    {
        $this->response = $this->kernel->handle(Request::create($path, 'GET'));
    }

    /**
     * @Then the response should be received
     */
    public function theResponseShouldBeReceived(): void
    {
        if (!$this->response instanceof \Symfony\Component\HttpFoundation\Response) {
            throw new RuntimeException('No response received');
        }
    }

    /**
     * @BeforeScenario
     *
     * @throws \Doctrine\DBAL\Exception
     */
    public function beginTransaction(BeforeScenarioScope $scope): void
    {
        if ($this->scopeIsReadOnly($scope)) {
            return;
        }

        $this->entityManager->getConnection()->beginTransaction();
    }

    /**
     * @AfterScenario
     *
     * @throws \Doctrine\DBAL\Exception
     */
    public function databaseRollBack(AfterScenarioScope $scope): void
    {
        if ($this->scopeIsReadOnly($scope)) {
            return;
        }

        $this->entityManager->getConnection()->rollBack();
    }

    public function setArrayContainsComparator(ArrayContainsComparator $comparator): self
    {
        $this->arrayContainsComparator = $comparator;

        return $this;
    }

    /**
     * @Then the JSON node :node should have :count element(s)
     *
     * @throws AssertionFailedException
     */
    public function theJsonNodeShouldHaveElement(string $node, int $count): void
    {
        try {
            $body = $this->getResponseBody();

            if (!isset($body[$node])) {
                throw new AssertionFailedException(sprintf('%s node is not present in JSON Response body', $node));
            }

            Assertion::count(
                $body[$node],
                $count,
                sprintf(
                    'Expected response body to be a JSON array with %d entr%s, got %d: .',
                    $count,
                    1 === $count ? 'y' : 'ies',
                    is_countable($body[$node]) ? count($body[$node]) : 0
                )
            );
        } catch (AssertionFailure $e) {
            throw new AssertionFailedException($e->getMessage());
        }
    }

    /**
     * @When the JSON node :node should be :value
     *
     * @throws AssertionFailedException
     */
    public function theJsonNodeShouldBe(string $node, mixed $value): void
    {
        try {
            $body = $this->getResponseBody();

            if (!isset($body[$node])) {
                throw new AssertionFailedException(sprintf('%s node is not present in JSON Response body', $node));
            }

            Assertion::same(
                (string) $body[$node],
                (string) $value,
                sprintf(
                    'Expected response body to be a field with %s, got %s.',
                    $value,
                    $body[$node]
                )
            );
        } catch (AssertionFailure $e) {
            throw new AssertionFailedException($e->getMessage());
        }
    }

    /**
     * @When the JSON node :node should exist
     */
    public function theJsonNodeShouldExist(string $node): void
    {
        $body = $this->getResponseBody();

        if (!isset($body[$node])) {
            throw new AssertionFailedException(sprintf('%s node is not present in JSON Response body', $node));
        }
    }

    /**
     * Set an HTTP request header.
     *
     * If the header already exists it will be overwritten
     *
     * @param string $header The header name
     * @param string $value  The header value
     *
     * @Given the :header request header is :value
     */
    public function setRequestHeader(string $header, string $value): self
    {
        $this->header[strtoupper($header)] = $value;

        return $this;
    }

    /**
     * Set/add an HTTP request header.
     *
     * If the header already exists it will be converted to an array
     *
     * @param string $header The header name
     * @param string $value  The header value
     *                       throw new PendingException();
     *
     * @Given the :header request header contains :value
     */
    public function addRequestHeader(string $header, string $value): self
    {
        $this->header[strtoupper($header)] = $value;

        return $this;
    }

    /**
     * Add multipart form parameters to the request.
     *
     * @param TableNode $table <string, string> $table Table with name / value pairs
     *
     * @Given the following multipart form parameters are set:
     */
    public function setRequestMultipartFormParams(TableNode $table): self
    {
        $body = [];
        foreach ($this->getTableNodeHash($table) as $name => $value) {
            $body[$name] = $value;
        }

        $this->multiFormParameters = $body;

        return $this;
    }

    /**
     * Set the request body to a string.
     *
     * @param PyStringNode|string $string The content to set as the request body
     *
     * @throws InvalidArgumentException if form_params or multipart is used in the request options
     *                                  an exception will be thrown as these can't be combined
     *
     * @Given the request body is:
     */
    public function setRequestBody(string|PyStringNode $string): self
    {
        if ($this->multiFormParameters !== []) {
            throw new InvalidArgumentException('It\'s not allowed to set a request body when using multipart/form-data or form parameters.');
        }

        if ($string instanceof PyStringNode) {
            $string = (string) $string;
        }

        $this->content = $string;

        return $this;
    }

    /**
     * Add a query parameter to the upcoming request.
     *
     * @param string           $name  The name of the parameter
     * @param string|TableNode $value <string, string> $value The value to add
     *
     * @Given the query parameter :name is :value
     * @Given the query parameter :name is:
     */
    public function setQueryStringParameter(string $name, string|TableNode $value): self
    {
        $this->queryParameter[$name] = $value;

        return $this;
    }

    /**
     * Set multiple query parameters for the upcoming request.
     *
     * @param TableNode $params <string, string> $params The values to set
     *
     * @Given the following query parameters are set:
     */
    public function setQueryStringParameters(TableNode $params): self
    {
        throw new PendingException(__FUNCTION__ . ':' . __LINE__ . ' TODO: write pending definition');
    }

    /**
     * Request a path.
     *
     * @param string $path   The path to request
     * @param string $method The HTTP method to use
     *
     * @When I request :path
     * @When I request :path using HTTP :method
     */
    public function requestPath(string $path, string $method): self
    {
        $this->sendRequest($path, $method);

        return $this;
    }

    /**
     * Assert the HTTP response code.
     *
     * @param int|string $code The HTTP response code
     *
     * @throws AssertionFailedException
     *
     * @Then the response code is :code
     */
    public function assertResponseCodeIs(int|string $code): bool
    {
        if (!$this->response instanceof \Symfony\Component\HttpFoundation\Response) {
            throw new RuntimeException(self::NO_RESPONSE_YET);
        }

        try {
            Assertion::same(
                $actual = $this->response->getStatusCode(),
                $expected = $this->validateResponseCode((int) $code),
                sprintf('Expected response code %d, got %d.', $expected, $actual)
            );
        } catch (AssertionFailure $e) {
            throw new AssertionFailedException($e->getMessage());
        }

        return true;
    }

    /**
     * Assert that the response body matches some content.
     *
     * @param PyStringNode $content The content to match the response body against
     *
     * @throws AssertionFailedException
     *
     * @Then the response body is:
     */
    public function assertResponseBodyIs(PyStringNode $content): bool
    {
        $body = $this->response?->getContent();

        try {
            Assertion::same((string) $content, $encoded = $body, sprintf(
                'Expected response body, got "%s".',
                $encoded
            ));
        } catch (AssertionFailure $e) {
            throw new AssertionFailedException($e->getMessage());
        }

        return true;
    }

    /**
     * Assert that the response body matches some content using a regular expression.
     *
     * @param PyStringNode $pattern The regular expression pattern to use for the match
     *
     * @throws AssertionFailedException
     *
     * @Then the response body matches:
     */
    public function assertResponseBodyMatches(PyStringNode $pattern): bool
    {
        if (!$this->response instanceof \Symfony\Component\HttpFoundation\Response) {
            throw new RuntimeException(self::NO_RESPONSE_YET);
        }

        $pattern = (string) $pattern;

        try {
            Assertion::regex($body = (string) $this->response->getContent(), $pattern, sprintf(
                'Expected response body to match regular expression "%s", got "%s".',
                $pattern,
                $body
            ));
        } catch (AssertionFailure $e) {
            throw new AssertionFailedException($e->getMessage());
        }

        return true;
    }

    /**
     * Assert that the response body contains all keys / values in the parameter.
     *
     * @throws AssertionFailedException
     *
     * @Then the response body contains JSON:
     */
    public function assertResponseBodyContainsJson(PyStringNode $contains): bool
    {
        // Decode the parameter to the step as an array and make sure it's valid JSON
        $contains = $this->jsonDecode((string) $contains);

        $body = $this->getResponseBody();
        //        dd($contains, $body);
        try {
            // Compare the arrays, on error this will throw an exception
            Assertion::true($this->arrayContainsComparator->compare($contains, $body));
        } catch (AssertionFailure) {
            throw new AssertionFailedException('Comparator did not return in a correct manner. Marking assertion as failed.');
        }

        return true;
    }

    /**
     * Validate a response code.
     *
     * @throws InvalidArgumentException
     */
    public function validateResponseCode(int $code): int
    {
        $e = null;
        try {
            Assertion::range($code, 100, 599, sprintf('Response code must be between 100 and 599, got %d.', $code));
        } catch (AssertionFailure $e) {
            throw new InvalidArgumentException($e->getMessage(), $e->getCode(), $e);
        }

        return $code;
    }

    /**
     * @Given I am authenticated as :username
     */
    public function iAmAuthenticatedAs(string $email): void
    {
        $user = $this->apiUserProvider->loadUserByIdentifier($email);

        /* @phpstan-ignore-next-line */
        $token = $this->kernel->getContainer()->get('lexik_jwt_authentication.jwt_manager')->create($user);

        $this->addRequestHeader('HTTP_AUTHORIZATION', 'Bearer ' . $token);
    }

    /**
     * Get the JSON-encoded array or stdClass from the response body.
     *
     * @return array <mixed>
     *
     * @throws InvalidArgumentException
     */
    protected function getResponseBody(): array
    {
        if (!$this->response || !$this->response->getContent()) {
            return [];
        }

        return $this->jsonDecode($this->response->getContent());
    }

    /**
     * Convert some variable to a JSON-array.
     *
     * @param string      $value        The value to decode
     * @param string|null $errorMessage Optional error message
     *
     * @return array <mixed>
     *
     * @throws InvalidArgumentException
     */
    protected function jsonDecode(string $value, string $errorMessage = null): array
    {
        $decoded = json_decode($value, true);

        if (JSON_ERROR_NONE !== json_last_error()) {
            throw new InvalidArgumentException($errorMessage ?: 'The supplied parameter is not a valid JSON object.');
        }

        return $decoded;
    }

    protected function sendRequest(string $path, string $method): self
    {
        if ($this->queryParameter !== []) {
            $path .= '?' . http_build_query($this->queryParameter);
        }

        $this->request = $this->createRequest($path, $method);

        $this->response = $this->kernel->handle($this->request);

        // trigger the kernel.terminate event
        if ($this->kernel instanceof Kernel) {
            $this->kernel->terminate($this->request, $this->response);
        }

        return $this;
    }

    private function createRequest(string $path, string $method = 'GET'): Request
    {
        return Request::create(
            $path,
            $method,
            $this->multiFormParameters,
            [],
            $this->files,
            $this->header,
            $this->content
        );
    }

    /**
     * Get an associative array from the TableNode.
     *
     * This method will effectively remove duplicates from TableNode
     *
     * @param TableNode <string, string> $table
     *
     * @return array<string, string>
     */
    protected function getTableNodeHash(TableNode $table): array
    {
        // @var array<string, string>
        return array_slice($table->getRowsHash(), 1);
    }

    protected function scopeIsReadOnly(ScenarioScope $scope): bool
    {
        if ($scope->getScenario()->hasTag(self::TAG_READ_ONLY)) {
            return true;
        }

        return $scope->getFeature()->hasTag(self::TAG_READ_ONLY);
    }
}
