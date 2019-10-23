<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\GroupCollection;
use App\Http\Resources\GroupResource;
use App\Models\Group;

class GroupController extends Controller
{
    public function index()
    {
        return new GroupCollection(Group::all());
    }
 
    public function show($id)
    {
        return new GroupResource(Group::findOrFail($id));
    }

    public function store(Request $request)
    {
        $groups = Group::create($request->all());

        return (new GroupResource($groups))
            ->response()
            ->setStatusCode(201);
    }

    public function update(Request $request, $id)
    {
        $group = Group::findOrFail($id);
        $group->update($request->all());

        return response()->json(null, 204);
    }

    public function delete(Request $request, $id)
    {
        $group = Group::findOrFail($id);
        $group->delete();

        return response()->json(null, 204);
    }
}
