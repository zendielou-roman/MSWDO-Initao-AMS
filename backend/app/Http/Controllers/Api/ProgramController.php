<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    /**
     * Return all programs as JSON.
     */
    public function index()
    {
        return response()->json(Program::all());
    }

    /**
     * Create a new program.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string|max:255',
            'allocated' => 'required|integer|min:0',
            'focal_person' => 'nullable|string|max:255',
        ]);

        $validated['program_code'] = $this->nextProgramCode();
        $validated['status'] = 'Active';
        $validated['released'] = 0;
        $validated['beneficiaries'] = 0;

        $program = Program::create($validated);

        return response()->json($program, 201);
    }

    /**
     * Update an existing program.
     */
    public function update(Request $request, Program $program)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'sometimes|required|string|max:255',
            'status' => 'sometimes|required|string',
            'allocated' => 'sometimes|required|integer|min:0',
            'released' => 'sometimes|required|integer|min:0',
            'beneficiaries' => 'sometimes|required|integer|min:0',
            'focal_person' => 'nullable|string|max:255',
        ]);

        $program->update($validated);

        return response()->json($program);
    }

    /**
     * Delete a program.
     */
    public function destroy(Program $program)
    {
        $program->delete();

        return response()->json(['message' => 'Program deleted successfully.']);
    }

    /**
     * Generate the next PRG-### code.
     */
    private function nextProgramCode(): string
    {
        $last = Program::orderByDesc('id')->first();
        $nextNumber = $last ? ((int) substr($last->program_code, 4)) + 1 : 1;

        return 'PRG-' . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);
    }
}
