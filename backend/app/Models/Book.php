<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
// use Laravel\Scout\Searchable;


class Book extends Model
{
    use HasFactory, SoftDeletes;
    //
    protected $table = "books";
    //
    protected $fillable = [
        'title',
        'publication_date',
        'publisher_name',
        'isbn',
        'author',
        'genre_id',
        'description',
        'image',
    ];
}
