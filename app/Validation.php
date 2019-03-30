<?php

namespace App;

use Illuminate\Support\Facades\Validator;

abstract class Validation
{
    protected $validator;

    public function __construct(array $data)
    {
        $this->validator = Validator::make($data, $this->rules());
    }

    public function __call($validatorMethod, $args)
    {
        if (in_array($validatorMethod, [
            'validate',
            'fails',
            'errors'
        ])) {
            return $this->validator->{$validatorMethod}(...$args);
        }
    }
}