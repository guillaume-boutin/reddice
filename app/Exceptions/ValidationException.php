<?php

namespace App\Exceptions;

use Exception;
use App\Validation;

class ValidationException extends Exception
{
    public function __construct(Validation $validator)
    {
        $this->validator = $validator;
    }
    
    public function getErrors()
    {
        $errors = $this->validator->errors()->all();

        $messages = [];
        foreach ($errors as $fied => $message) {
            $messages[$fied] = $message;
        }

        return $messages;
    }
}