<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Unit extends Model
{
    use HasFactory, HasApiTokens;

    protected $guarded = [];

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function suppliers()
    {
        return $this->hasMany(Supplier::class);
    }

    public function computer()
    {
        return $this->belongsTo(Computer::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    protected function casts(): array
    {
        return [
            'date_of_purchase'  =>  'datetime'
        ];
    }
    public function computers()
    {
        return $this->belongsToMany(Computer::class, 'computer_unit');
    }
}
