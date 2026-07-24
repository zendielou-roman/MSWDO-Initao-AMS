<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('client_code')->unique();
            $table->date('date_registered');
            $table->boolean('same_as_client')->default(true);

            // Client identifying data
            $table->string('surname');
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('ext')->nullable();
            $table->unsignedInteger('age');
            $table->string('sex');
            $table->string('purok')->nullable();
            $table->string('barangay');
            $table->string('religion')->nullable();
            $table->string('civil_status')->nullable();
            $table->string('highest_education')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('place_of_birth')->nullable();
            $table->string('occupation')->nullable();
            $table->unsignedInteger('monthly_income')->default(0);
            $table->string('relationship_to_beneficiary')->nullable();
            $table->boolean('pantawid')->default(false);
            $table->boolean('philhealth')->default(false);
            $table->string('contact');

            // Beneficiary identifying data (nullable — only used if same_as_client is false)
            $table->string('beneficiary_surname')->nullable();
            $table->string('beneficiary_first_name')->nullable();
            $table->string('beneficiary_middle_name')->nullable();
            $table->string('beneficiary_ext')->nullable();
            $table->unsignedInteger('beneficiary_age')->nullable();
            $table->string('beneficiary_sex')->nullable();
            $table->string('beneficiary_purok')->nullable();
            $table->string('beneficiary_barangay')->nullable();
            $table->string('beneficiary_religion')->nullable();
            $table->string('beneficiary_civil_status')->nullable();
            $table->string('beneficiary_highest_education')->nullable();
            $table->date('beneficiary_date_of_birth')->nullable();
            $table->string('beneficiary_place_of_birth')->nullable();
            $table->string('beneficiary_occupation')->nullable();
            $table->unsignedInteger('beneficiary_monthly_income')->nullable();

            // Household & financial
            $table->string('other_income_source')->nullable();
            $table->unsignedInteger('other_income_amount')->default(0);
            $table->unsignedInteger('total_monthly_income')->default(0);
            $table->json('household_condition')->nullable();
            $table->unsignedInteger('food')->default(0);
            $table->unsignedInteger('education_exp')->default(0);
            $table->unsignedInteger('rent')->default(0);
            $table->unsignedInteger('transportation')->default(0);
            $table->unsignedInteger('recreation')->default(0);
            $table->unsignedInteger('medical')->default(0);
            $table->unsignedInteger('others_exp')->default(0);
            $table->json('categories')->nullable();
            $table->string('status')->default('Active');

            $table->timestamps();
        });

        Schema::create('family_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->unsignedInteger('age')->nullable();
            $table->string('civil_status')->nullable();
            $table->string('relationship')->nullable();
            $table->string('education')->nullable();
            $table->string('occupation')->nullable();
            $table->unsignedInteger('income')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('family_members');
        Schema::dropIfExists('clients');
    }
};