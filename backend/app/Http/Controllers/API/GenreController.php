<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Http\Request;
use App\Models\Genre;
use Validator;
use Exception;

class GenreController extends BaseController
{
    /**
     * 
     * 
    */
    public function getGenre(Request $request){
        try {
            $data = Genre::Select('id', 'name', 'deleted_at')->latest()->get();
            $success['dataCount'] = count($data);
            $success['data'] = $data;
            return $this->sendResponse($success, 'User login successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error.', ['error'=>$e->getMessage()]);
        }
    }

    /**
     * 
     * 
     * 
    */
    public function addUpdateGenre(Request $request){

        try {
            if(empty($request->id)){
                $genreObj = new Genre;
                $genreObj->name = $request->genreName;
                if($genreObj->save()){
                    return $this->sendResponse([], 'The genre stored successfully');
                }else{
                    return $this->sendError('Error.', ['error'=>"Somthing went wrong!"]);
                }
             }else{
                $genreObj = Genre::find($request->id);
                $genreObj->name = $request->genreName;
                if($genreObj->update()){
                    return $this->sendResponse([], 'The genre updated successfully');
                }else{
                    return $this->sendError('Error.', ['error'=>"Somthing went wrong!"]);
                }
             }
        } catch (Exception $e) {
            return $this->sendError('Error.', ['error'=>$e->getMessage()]);
        }
    }

    /**
     * 
     * 
    */
    public function removeGenre($id){
        try {
            Genre::Where('id', $id)->delete();
            return $this->sendResponse([], 'The genre deleted successfully');
        } catch (Exception $e) {
            return $this->sendError('Error.', ['error'=>$e->getMessage()]); 
        }
    }
}
