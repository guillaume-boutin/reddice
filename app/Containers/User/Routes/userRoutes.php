<?php

Route::group(['prefix' => 'users'], function () {
    Route::post('signup', ['uses' => 'UserController@signup', 'as' => 'users.signup']);
});