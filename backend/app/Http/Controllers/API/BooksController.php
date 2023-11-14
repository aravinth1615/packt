<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Book;
use Validator;
use Exception;
use DB;

class BooksController extends BaseController{
    
    /**
     *
     *  
     * 
    */
    public function getBooks(Request $request){
        try {
            $data = Book::Select('books.id', 'title', 'publication_date', 'publication_date as pubdate', 'publisher_name', 'isbn', 'author', 'description', 'image', 'genre_id', 'genres.name','books.deleted_at')
            ->leftJoin('genres', function($join){
                $join->on('genres.id','=','genre_id');
            })->orderBy('books.created_at', 'DESC')->get();

            if(count($data)>0){
                foreach ($data as $key => $value) {
                   $data[$key]['publication_date'] = date('d M Y', strtotime($value->publication_date));
                   $data[$key]['image'] = (!empty($value->image)) ?  asset('/storage/uploads/' . $value->image) : null;
                   $data[$key]['pubdate'] = date('Y-m-d', strtotime($value->pubdate));

                }
            }

            $success['dataCount'] = count($data);
            $success['data'] = $data;
            return $this->sendResponse($success, 'Books login successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error.', ['error'=>$e->getMessage()]);
        }
    }

    public function addOrUpdateBooks(Request $request){

        try {
            DB::beginTransaction();
            if(empty($request->id)){
                $bookObj = new Book;
                $bookObj->title = $request->title;
                $bookObj->publisher_name = $request->publisher_name;
                $bookObj->publication_date = $request->publisher_date;
                $bookObj->isbn = $request->isbn;
                $bookObj->author = $request->author;
                $bookObj->description = $request->description;
                
                $bookObj->genre_id = $request->genre['value'];

                if(!empty($request->image) && count($request->file('image')) > 0){
                    $image = $request->file('image')[0];
                    $imageName = time() . '.' . $image->getClientOriginalExtension();
                    $image->move(storage_path('app/public/uploads'), $imageName);
                    $bookObj->image = $imageName;
                }else{
                    $bookObj->image = null;
                }

                $bookObj->save();
                DB::commit();
                return $this->sendResponse([], 'The book saved successfully.');
                
            }else{
                $bookObj = Book::find($request->id);
                $bookObj->title = $request->title;
                $bookObj->publisher_name = $request->publisher_name;
                $bookObj->publication_date = $request->publisher_date;
                $bookObj->isbn = $request->isbn;
                $bookObj->author = $request->author;
                $bookObj->description = $request->description;
                
                $bookObj->genre_id = $request->genre['value'];

               


                if(!empty($request->image) && count($request->file('image')) > 0){

                    if(!empty($bookObj->image) && !empty($bookObj->image)){
                        if(file_exists(storage_path('/app/public/uploads/'.$bookObj->image))) {
                            unlink(storage_path('/app/public/uploads/'.$bookObj->image));
                        }
                    }

                    $image = $request->file('image')[0];
                    $imageName = time() . '.' . $image->getClientOriginalExtension();
                    $image->move(storage_path('app/public/uploads'), $imageName);
                    $bookObj->image = $imageName;
                }else{
                    $bookObj->image = $bookObj->image;
                }

                $bookObj->update();
                DB::commit();
                return $this->sendResponse([], 'The book update successfully.');
            }
        } catch (Exception $e) {
            DB::rollBack();
            return $this->sendError('Error.', ['error'=>$e->getMessage()]);
        }

        
    }

    /**
     * 
     * 
    */
    public function removeBook($id){
        try {
            // $bookDetails = Book::find($id);
            // if(file_exists(storage_path('app/public/uploads/'.$bookDetails->image))){
            //     unlink(storage_path('app/public/uploads/'.$bookDetails->image));
            // }
            // $bookDetails->delete();
            Book::Where('id', $id)->delete();
            return $this->sendResponse([], 'The book deleted successfully');
        } catch (Exception $e) {
            return $this->sendError('Error.', ['error'=>$e->getMessage()]); 
        }
    }


    /**
     *
     *  
     * 
    */
    public function getBooksForCustomer(Request $request){
        try {
            $searchTerm = $request->searchKeyword;
            $data = Book::Select('books.id', 'title', 'publication_date', 'isbn', 'author', 'description', 'image', 'genre_id', 'genres.name','books.deleted_at', 'publisher_name')
            ->leftJoin('genres', function($join){
                $join->on('genres.id','=','genre_id');
            })
            
            // ->where('title','LIKE',"%{$request->searchKeyword}%")
            // ->orwhere('isbn','LIKE',"%{$request->searchKeyword}%")
            // ->orwhere('publisher_name','LIKE',"%{$request->searchKeyword}%")
            // ->orwhere('author','LIKE',"%{$request->searchKeyword}%")
            // ->orwhere('genres.name','LIKE',"%{$request->searchKeyword}%")
            

            ->where(function($query) use($searchTerm) {
                $query->where('title', 'LIKE', '%' . $searchTerm . '%')
                    ->orWhere('isbn', 'LIKE', '%' . $searchTerm . '%')
                    ->orWhere('publisher_name', 'LIKE', '%' . $searchTerm . '%')
                    ->orWhere('author', 'LIKE', '%' . $searchTerm . '%')
                    ->orWhere('genres.name', 'LIKE', '%' . $searchTerm . '%')
                ;
            })->orderBy('books.created_at', 'DESC')->get();

            if(count($data)>0){
                foreach ($data as $key => $value) {
                   $data[$key]['publication_date'] = date('d M Y', strtotime($value->publication_date));
                   $data[$key]['image'] = (!empty($value->image)) ?  asset('/storage/uploads/' . $value->image) : null;
                }
            }

            $response['status'] = "OK";
            $response['code'] = 200;
            $response['total'] = count($data);
            $response['data'] = $data;


            return response()->json($response, 200);
            //return $this->sendResponse($success, 'Books login successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error.', ['error'=>$e->getMessage()]);
        }
    }
}
