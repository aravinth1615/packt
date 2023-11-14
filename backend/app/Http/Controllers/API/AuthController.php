<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
// use Validator;
use Exception;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Jobs\SendEmailJob;


class AuthController extends BaseController
{
    /**
     * Login api
     * @param Request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request){

        try {
            $emailUserType = User::Where('email', $request->email)->first();
            if(!empty($emailUserType) && $emailUserType->user_type == 2){
                if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){

                    $user = Auth::user(); 
                    $success['token'] =  $user->createToken('apiToken')->plainTextToken; 
                    $success['data'] =  ["name"=>$user->name, "email" =>$user->email];
                    return $this->sendResponse($success, 'User login successfully.');
                } 
                else{ 
                    return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
                } 
            }else{
                return $this->sendError('Unauthorised.', ['error'=>'You are not admin']);
            }
            
        } catch (Exception $e) {
            return $this->sendError('Error.', ['error'=>$e->getMessage()]);
        }

       
    }

   /**
    * Logout api 
    * @param Request
    * @return \Illuminate\Http\Response
    */
    public function logout(Request $request){
        try {
            auth()->user()->tokens()->delete();
            return $this->sendResponse([], 'User logout successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error.', ['error'=>$e->getMessage()]);
        }  
    }

    /**
     * Register api 
     * @param Request
     * @return \Illuminate\Http\Response
    */
    public function register(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        if ($validator->fails()) {
            return $this->sendError('Error.', ['error'=>$validator->errors()]);
        }

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'user_type'=> 2
        ]);

        //
        $details['email'] = $request->input('email');
        dispatch(new SendEmailJob($details));
        //

        return $this->sendResponse([], 'User registered successfully');
    }
}
