function routeTemplate(){
return `
    <div id="page-content">
        <div class="container">
            <div id="page-title">
                <button class="btn btn-primary pull-right" onclick="showUserModal()">Add new data</button>
                <h2 class="pages"></h2>
            </div>
            <div class="panel">
                <div class="panel-body">
                    <div class="example-box-wrapper">
                        <div id="datatable-example_wrapper" class="dataTables_wrapper form-inline no-footer">
                            <table id="table-route" class="table table-striped table-bordered table-hover table-responsive" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>NAMA</th>
                                        <th>DESKRIPSI</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <button class="btn btn-success b-add" onclick="showRouteModal()"><i class="fa fa-plus"></i> Tambah </button>
                    <button class="btn btn-default" onclick="reloadRouteTable()"><i class="fa fa-refresh"></i> Reload</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modal-route" route="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h3 class="modal-title"></h3>
                </div>
                <div class="modal-body FormElement">
                    <form action="#" id="form-route" class="form-horizontal" onsubmit="saveRoute()">
                        <div class="form-body">
                            <div class="form-group" id="group-name">
                                <label class="control-label col-md-3">NAMA*</label>
                                <div class="col-md-9">
                                    <input name="id" type="hidden" value="">
                                    <input name="name" placeholder="nama" class="form-control" type="text" required>
                                    <span class="help-block"></span>
                                </div>
                            </div>
                            <div class="form-group" id="group-description">
                                <label class="control-label col-md-3">DESKRIPSI</label>
                                <div class="col-md-9">
                                    <input name="description" placeholder="deskripsi" class="form-control" type="text">
                                    <span class="help-block"></span>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary"><i class="fa fa-floppy-o"></i> <span id="btnSave">Simpan</span></button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-undo"></i> Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
`
}