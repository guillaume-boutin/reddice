<?php

namespace App\Containers\User\Transporters;

use Dto\Dto;
use Illuminate\Http\Request;

class RegisterUserTransporter extends Dto
{
    protected $schema = [
        'type' => 'object',
        'properties' => [
            'username' => ['type' => 'string'],
            'email' => ['type' => 'string'],
            'password' => ['type' => 'string'],
            'password_confirmation' => ['type' => 'string']
        ],

        'required' => ['username', 'email', 'password']
    ];

    public static function fromRequest(Request $request) : self
    {
        return new self($request->all());
    }
}