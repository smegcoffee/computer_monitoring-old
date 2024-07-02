<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class RecentUser extends Model
{
    use HasFactory, HasApiTokens;

    protected $guarded = [];

    public function computer()
    {
        return $this->belongsTo(Computer::class);
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function computerUser()
    {
        return $this->belongsTo(ComputerUser::class);
    }
}
