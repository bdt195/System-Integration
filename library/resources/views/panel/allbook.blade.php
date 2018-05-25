@extends('layout.index')

@section('custom_top_script')
@stop

@section('content')
<div class="content">
    <div class="module">
        <div class="module-head">
            <h3>Books available to Students</h3>
        </div>
        <div class="module-body">
            <table class="table table-striped table-bordered table-condensed">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Book Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Available</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id="all-books">
                    @foreach($books as $book)
                        <tr class="text-center">
                            <td colspan="99">{{ $book->id }}</td>
                            <td colspan="99">Loading...</td>
                            <td colspan="99">Loading...</td>
                            <td colspan="99">Loading...</td>
                            <td colspan="99">Loading...</td>
                            <td colspan="99">Loading...</td>
                            <td colspan="99">Loading...</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
@stop

@section('custom_bottom_script')
@stop
