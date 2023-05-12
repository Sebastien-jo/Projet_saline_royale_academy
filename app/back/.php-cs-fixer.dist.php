<?php

declare(strict_types=1);

$finder = PhpCsFixer\Finder::create()
    ->in(__DIR__ . '/bin')
    ->in(__DIR__ . '/config')
    ->in(__DIR__ . '/src')
    ->in(__DIR__ . '/tests')
    ->in(__DIR__ . '/public')
;

return (new PhpCsFixer\Config())
    ->setRules([
        '@Symfony' => true,
        '@PHP80Migration' => true,
        'heredoc_indentation' => false,
        'php_unit_method_casing' => false,
        'array_syntax' => ['syntax' => 'short'],
        'concat_space' => ['spacing' => 'one'],
        'increment_style' => false,
        'no_superfluous_phpdoc_tags' => ['allow_mixed' => true],
        // set to false while we don't run the cs-fixer on the whole project and pass the strict rule
        'phpdoc_annotation_without_dot' => true,
        'phpdoc_no_useless_inheritdoc' => true,
        'phpdoc_summary' => false,
        'standardize_increment' => false,
        'yoda_style' => false,
        'method_chaining_indentation' => false,
        'multiline_whitespace_before_semicolons' => ['strategy' => 'new_line_for_chained_calls'],
        'array_indentation' => true,
        'compact_nullable_typehint' => true,
        'binary_operator_spaces' => [
            'default' => 'single_space',
            'operators' => ['=>' => null],
        ],
        'global_namespace_import' => [
            'import_classes' => true,
            'import_functions' => true,
            'import_constants' => true,
        ],

        'ordered_imports' => [
            'imports_order' => ['class', 'function', 'const'],
        ],
    ])
    ->setFinder($finder)
;
