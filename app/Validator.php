<?php

namespace App;

use Illuminate\Support\Facades\Validator as ValidatorFacade;

abstract class Validator
{
    public static function make($data)
    {
        return ValidatorFacade::make($data, $this->rules);
    }
}