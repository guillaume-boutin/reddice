<?php
namespace App\Containers\User\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Containers\User\Actions\RegisterAction;

class UserController extends Controller
{
    public function signup(Request $request)
    {
        return response()->json(['user' => $request->all()], 201);
        $action = RegisterAction::new($request->all())->run();
        
        return $action->jsonResponse();
    }
}