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
    public function branchCode()
    {
        return $this->belongsTo(BranchCode::class);
    }
    public function position()
    {
        return $this->belongsTo(Position::class);
    }
    public function recentUnits()
    {
        return $this->belongsToMany(Unit::class, 'recent_users')->withTimestamps();
    }
    public function recentUsers()
    {
        return $this->hasMany(RecentUser::class);
    }
    public function transferUnits()
    {
        return $this->hasMany(TransferUnit::class);
    }
}
