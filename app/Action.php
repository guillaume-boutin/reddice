<?php

namespace App;

use App\Exceptions\ValidationException;

abstract class Action
{
    protected $data;

    protected $result;

    protected $status;

    public static function new($data)
    {
        return new static($data);
    }

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function __get($field)
    {
        return $this->data[$field] ?? null;
    }

    public function getResult()
    {
        return $this->result;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function jsonResponse()
    {
        return response()->json($this->result, $this->status);
    }

    public function run() : self
    {
        try {
            $this->validate();
        } catch (ValidationException $e) {
            $this->status = 422;
            $this->result = [
                'message' => 'The given data was invalid',
                'errors' => $e->getErrors()
            ];

            return $this;
        }

        return $this->execute();
    }

    protected function validate()
    {
        if (! method_exists($this, 'validation')) {
            return;
        }

        $ValiationClass = $this->validation();
        $validator = new $ValiationClass($this->data);

        $validator->validate();

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}