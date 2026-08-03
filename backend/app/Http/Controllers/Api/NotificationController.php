<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Return notifications for a specific user.
     */
    public function index(Request $request)
    {
        $userId = $request->query('user_id');

        $query = Notification::query()->orderByDesc('created_at');

        if ($userId) {
            $query->where('user_id', $userId);
        }

        return response()->json($query->get());
    }

    /**
     * Mark a single notification as read.
     */
    public function update(Request $request, Notification $notification)
    {
        $validated = $request->validate([
            'read' => 'required|boolean',
        ]);

        $notification->update($validated);

        return response()->json($notification);
    }

    /**
     * Mark all of a user's notifications as read.
     */
    public function markAllRead(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        Notification::where('user_id', $validated['user_id'])->update(['read' => true]);

        return response()->json(['message' => 'All notifications marked as read.']);
    }

    /**
     * Notify all users with a given role (helper for trigger points elsewhere).
     */
    public static function notifyRole(string $role, string $message, string $category, string $type): void
    {
        $userIds = User::where('role', $role)->pluck('id');

        foreach ($userIds as $userId) {
            Notification::create([
                'user_id' => $userId,
                'message' => $message,
                'category' => $category,
                'type' => $type,
                'read' => false,
            ]);
        }
    }
}
