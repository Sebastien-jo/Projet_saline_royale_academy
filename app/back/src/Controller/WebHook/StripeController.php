<?php

namespace App\Controller\WebHook;

use Stripe\PaymentIntent;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StripeController extends AbstractController
{
    public function __construct()
    {
    }

    #[Route('/webhook', name: 'paymentIntent')]
    public function stripe(): Response
    {
        $endpoint_secret = $_ENV['STRIPE_WEBHOOK_SECRET'];

        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;

        if ($payload === false) {
            // Invalid payload
            return $this->json(['success' => false], 400);
        }

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sig_header,
                $endpoint_secret
            );
        } catch (\UnexpectedValueException) {
            // Invalid payload
            return $this->json(['success' => false], 400);
        } catch (\Stripe\Exception\SignatureVerificationException) {
            // Invalid signature
            return $this->json(['success' => false], 400);
        }

// Handle the event
        switch ($event->type) {
            case 'payment_intent.succeeded':
                /** @var PaymentIntent $object */
                $object = $event->data['object'];
                echo var_export($object, true);

                break;
                // ... handle other event types
            default:
                echo 'Received unknown event type ' . $event->type;
        }

        return $this->json(['success' => true]);
    }
}
