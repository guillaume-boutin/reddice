<?php

namespace App\Containers\User\Actions;

use App\Action;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use App\Containers\User\Validations\RegisterValidation;

class RegisterAction extends Action
{
    public function validation()
    {
        return RegisterValidation::class;
    }

    protected function execute() : self
    {
        $data = $this->transporter->toArray();

        event(new Registered($user = $this->createUser($data)));

        $this->guard()->login($user);

        $this->result = $user;
        $this->status = 201;

        return $this;
    }

    /**
     * Get the guard to be used during registration.
     *
     * @return \Illuminate\Contracts\Auth\StatefulGuard
     */
    protected function guard()
    {
        return Auth::guard();
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function createUser(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
}