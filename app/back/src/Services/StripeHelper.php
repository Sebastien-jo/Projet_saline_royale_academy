<?php

namespace App\Services;

use Stripe\Exception\ApiErrorException;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class StripeHelper
{
    public function __construct()
    {
        Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);
    }

    /**
     * @throws ApiErrorException
     */
    public static function CreatePaymentIntent(): PaymentIntent
    {
        return PaymentIntent::create([
            'amount' => 99,
            'currency' => 'eur',
            'description' => "Paiement de l'abonnement ( il y en a pas encore )",
            'metadata' => [
                'product' => 'inconnue',
                //                "userId" => $order->getBuyer(),
            ],
        ]);
    }

    /**
     * @throws ApiErrorException
     */
    public static function GetPaymentIntent($id)
    {
        return PaymentIntent::retrieve($id);
    }
}
