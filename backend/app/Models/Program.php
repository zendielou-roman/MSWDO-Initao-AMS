<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'program_code',
    'name',
    'description',
    'category',
    'status',
    'allocated',
    'released',
    'beneficiaries',
    'focal_person',
])]
class Program extends Model
{
    //
}