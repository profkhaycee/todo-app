<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Todo;
use Illuminate\Support\Facades\Validator;
use function Laravel\Prompts\progress;

class TodoController extends Controller
{
    // 🔹 Get all todos (with filter)
    public function index(Request $request)
    {
        $filter = $request->query('filter');

        $query = Todo::query();

        if ($filter === 'active') {
            $query->where('is_completed', false);
        } elseif ($filter === 'completed') {
            $query->where('is_completed', true);
        }

        $todos = $query->orderBy('order')->get();

        if ($todos->isEmpty()) {
            $filterText = $filter ? "$filter " : "";
            return response()->json([
                'status' => 'success',
                'message' => "No $filterText todos found",
                'data' => [],
                'progress' => $this->getProgress()
            ]);
        }

        return response()->json([
            'status' => 'success',
            'data' => $todos,
            'progress' => $this->getProgress()
        ]);
    }

    // 🔹 Create todo
    public function store(Request $request)
    {
        // $request->validate([
        //     'title' => 'required|string|max:255',
        // ]);

        $validation = Validator($request->all(), [
            'title' => 'required|string|max:255|unique:todos,title',
        ]);

        if($validation->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validation->errors()->first()
            ], 422);
        }

        // get last order
        $lastOrder = Todo::max('order') ?? 0;

        $todo = Todo::create([
            'title' => $request->title,
            'order' => $lastOrder + 1,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Todo created successfully',
            'data' => $todo,
            'progress' => $this->getProgress()
        ], 201);
    }

    // 🔹 Update todo
    public function update(Request $request, $id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return response()->json([
                'status' => 'error',
                'message' => 'Todo not found'
            ], 404);
        }


        $request->validate([
            'title' => 'sometimes|string|max:255',
        ]);

        $todo->update($request->only('title'));

        return response()->json([
            'status' => 'success',
            'message' => 'Todo updated successfully',
            'data' => $todo,
            'progress' => $this->getProgress()
        ]);
    }



    public function destroy($id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return response()->json([
                'status' => 'error',
                'message' => 'Todo not found'
            ], 404);
        }

        $todo->delete();

        //  Reorder remaining todos
        $todos = Todo::orderBy('order')->get();

        foreach ($todos as $index => $item) {
            $item->update([
                'order' => $index + 1
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Todo deleted successfully',
            'meta' => $this->getProgress()
        ]);
    }

    // 🔹 Toggle complete/incomplete
    public function toggle($id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return response()->json([
                'status' => 'error',
                'message' => 'Todo not found'
            ], 404);
        }

        $todo->is_completed = !$todo->is_completed;
        $todo->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Todo status updated',
            'data' => $todo,
            'progress' => $this->getProgress()
        ]);
    }

    // 🔹 Clear all completed todos
    public function clearCompleted()
    {
        Todo::where('is_completed', true)->delete();

        //  Reorder remaining todos
        $todos = Todo::orderBy('order')->get();

        foreach ($todos as $index => $item) {
            $item->update([
                'order' => $index + 1
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Completed todos cleared',
            'progress' => $this->getProgress()
        ]);
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'todos' => 'required|array',
            'todos.*.id' => 'required|exists:todos,id',
            'todos.*.order' => 'required|integer',
        ]);

        foreach ($request->todos as $item) {
            Todo::where('id', $item['id'])->update([
                'order' => $item['order']
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Todos reordered successfully',
            'progress' => $this->getProgress()
        ]);
    }

    private function getProgress()
    {
        $total = Todo::count();
        $completed = Todo::where('is_completed', true)->count();

        return [
            'total' => $total,
            'completed' => $completed,
            'progress' => $total > 0 ? "{$completed}/{$total}" : "0/0"
        ];
    }





}
