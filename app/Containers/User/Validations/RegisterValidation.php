<?php

namespace App\Containers\User\Validations;

use App\Validation;

class RegisterValidation extends Validation
{
    public function rules() : array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }
}