<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class ComputerUser extends Model
{
    use HasFactory, HasApiTokens;

    protected $guarded = [];

    public function computers()
    {
        return $this->hasMany(Computer::class)->with('units');
    }
}
