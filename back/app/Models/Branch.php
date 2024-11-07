<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function branchCode()
    {
        return $this->belongsTo(BranchCode::class);
    }
    public function recentUnits()
    {
        return $this->belongsToMany(Unit::class, 'recent_branches')->withTimestamps();
    }
    public function recentBranches()
    {
        return $this->hasMany(RecentBranch::class);
    }
    public function transferBranchUnits()
    {
        return $this->hasMany(TransferBranchUnit::class);
    }
    public function logs()
    {
        return $this->hasMany(Log::class);
    }
}
