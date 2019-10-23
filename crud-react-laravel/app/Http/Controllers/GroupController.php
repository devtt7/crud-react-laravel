<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;

class GroupController extends Controller
{
    public function index()
    {
        return Group::all();
    }
 
    public function show($id)
    {
        return Group::find($id);
    }

    public function store(Request $request)
    {
        return Group::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $group = Group::findOrFail($id);
        $group->update($request->all());

        return $group;
    }

    public function delete(Request $request, $id)
    {
        $group = Group::findOrFail($id);
        $group->delete();

        return 204;
    }
}
