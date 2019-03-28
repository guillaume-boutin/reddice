<?php

namespace App\Containers\User\Actions;

use App\Action;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Validator;
use App\Containers\User\Validators\RegisterUserValidator;
use App\Containers\User\Transporters\RegisterUserTransporter;

class RegisterAction extends Action
{
    protected $validator = RegisterUserValidator::class;

    public function __construct(RegisterUserTransporter $dto)
    {
        $this->transporter = $dto;
    }

    public function __call($name, $args)
    {
        // if ($name !== )
    }

    public static function new(RegisterUserTransporter $dto) : self
    {
        return new self($dto);
    }

    /**
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function run()
    {
        if (isset($this->validations)) {

        }
        // $this->validator($request->all())->validate();

        $data = $this->transporter->toArray();

        event(new Registered($user = $this->createUser($data)));

        $this->guard()->login($user);

        // return $this->registered($request, $user)
        //                 ?: redirect($this->redirectPath());
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validate()
    {
        $data = $this->transporter->toArray();

        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
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