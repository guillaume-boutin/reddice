<?php

namespace App;

use Illuminate\Support\Facades\Validator;

abstract class Action
{
    protected $result;

    public function run()
    {
        if (isset($this->rules)) {
            $this->validate();
        }
    }

    protected function validate()
    {
        $validator = Validator::make($this->transporter->toArray, $this->rules);
        $validator->validate();

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
        }
    }
}