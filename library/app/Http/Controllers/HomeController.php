<?php
namespace App\Http\Controllers;
use App\Category;
use App\Branch;
use App\StudentCategory;

class HomeController extends Controller {

    public $categories_list = [];
    public $branch_list = [];
    public $student_categories_list = [];

    public function __construct() {
        $this->categories_list = Category::select()->orderBy('category')->get();
        $this->branch_list = Branch::select()->orderBy('id')->get();
        $this->student_categories_list = StudentCategory::select()->orderBy('cat_id')->get();
    }

	public function home(){
		return view('panel.index')
            ->with('categories_list', $this->categories_list)
            ->with('branch_list', $this->branch_list)
            ->with('student_categories_list', $this->student_categories_list);
	}
}
