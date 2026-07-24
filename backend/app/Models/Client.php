<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'client_code',
    'date_registered',
    'same_as_client',
    'surname',
    'first_name',
    'middle_name',
    'ext',
    'age',
    'sex',
    'purok',
    'barangay',
    'religion',
    'civil_status',
    'highest_education',
    'date_of_birth',
    'place_of_birth',
    'occupation',
    'monthly_income',
    'relationship_to_beneficiary',
    'pantawid',
    'philhealth',
    'contact',
    'beneficiary_surname',
    'beneficiary_first_name',
    'beneficiary_middle_name',
    'beneficiary_ext',
    'beneficiary_age',
    'beneficiary_sex',
    'beneficiary_purok',
    'beneficiary_barangay',
    'beneficiary_religion',
    'beneficiary_civil_status',
    'beneficiary_highest_education',
    'beneficiary_date_of_birth',
    'beneficiary_place_of_birth',
    'beneficiary_occupation',
    'beneficiary_monthly_income',
    'other_income_source',
    'other_income_amount',
    'total_monthly_income',
    'household_condition',
    'food',
    'education_exp',
    'rent',
    'transportation',
    'recreation',
    'medical',
    'others_exp',
    'categories',
    'status',
])]
class Client extends Model
{
    protected $casts = [
        'household_condition' => 'array',
        'categories' => 'array',
    ];

    public function familyMembers()
    {
        return $this->hasMany(FamilyMember::class);
    }

    public function applications()
{
    return $this->hasMany(Application::class);
}


}
