<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Computer extends Model
{
    use HasFactory, HasApiTokens;
    
    protected $guarded = [];

    public function units()
    {
        return $this->hasMany(Unit::class);
    }

    public function computerUser()
    {
        return $this->belongsTo(User::class);
    }
}
