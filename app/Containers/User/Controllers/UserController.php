<?php
namespace App\Containers\User\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function signup(Request $request)
    {
        return response()->json($request->all());
    }
}