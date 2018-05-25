<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Issue;

class IssueController extends Controller {


	public function __construct(){
		$this->filter_params = array('issue_id');
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$issues = Issue::select('book_issue_id','student_id','issue_by','issued_at','return_time')
			->orderBy('issued_at')
            ->get()->toJson();

        return $issues;
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
        $newIssue = new Issue;
        $newIssue->book_issue_id = $request->input('book_id');
        $newIssue->student_id = $request->input('student_id');
        $newIssue->issued_at = $request->input('issued_at');

        $newIssue->save();
	}

    public function show($id)
    {
        $issue = Issue::find($id)->toJson();
        return $issue;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request)
    {
		$id = $request->input('id');
		$issue = Issue::find($id);
		$issue->book_issue_id = $request->input('book_id');
        $issue->student_id = $request->input('student_id');
        $issue->issued_at = $request->input('issued_at');
		$issue->return_at = $request->input('return_at');

        $issue->save();
		
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
		Issue::find($id)->delete();
		return true;
	}
	
	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function search($string)
	{
		$issues = Issue::select('book_issue_id','student_id','issue_by','issued_at','return_time')
			->where('id', 'like', '%' . $string . '%')
			->orWhere('student_id', 'like', '%' . $string . '%')
			->orWhere('book_issue_id', 'like', '%' . $string . '%')
			->orderBy('issued_at')
            ->get()
			->toJson();

        return $issues;
	}
}
