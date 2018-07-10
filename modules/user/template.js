function loadTemplateMasterUser(){
return `
<div id="page-content-wrapper">
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
                  <table id="list-user" class="table table-bordered display nowrap" style="width:100%">
                     <thead>
                        <th>No</th>
                        <th>Name</th>
                        <th>NIK</th>
                        <th>Department</th>
                        <th>Email</th>
                        <th>Option</th>
                        <th></th>
                     </thead>
                     <tbody>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>

<div id="modal-user" class="modal" tabindex="-1" role="dialog" aria-labelledby="moda-user" aria-hidden="true">
<div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Modal title</h4>
        </div>
        <form class="form-horizontal bordered-row" id="form-user" onSubmit="saveUser()">
            <div class="modal-body">
                <div class="example-box-wrapper">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">Name</label>
                        <div class="col-sm-6">
                            <input type="text" name="name" class="form-control" id="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">NIP</label>
                        <div class="col-sm-6">
                            <input type="number" name="nip" class="form-control" id="nip">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">Username</label>
                        <div class="col-sm-6">
                            <input type="text" name="username" class="form-control" id="username">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">Password</label>
                        <div class="col-sm-6">
                            <input type="password" name="password" class="form-control" id="password">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">Email</label>
                        <div class="col-sm-6">
                            <input type="email" name="email" class="form-control" id="email">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">Employee</label>
                        <div class="col-sm-6">
                            <div class="checkbox checkbox-primary">
                            <label>
                                <select class="form-control" name="isemployee">
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">Unit Kerja</label>
                        <div class="col-sm-6">
                            <div class="checkbox checkbox-primary">
                                <select class="form-control" name="unit_kerja_id">
                                    <option>1</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">Role</label>
                        <div class="col-sm-6">
                            <div class="checkbox checkbox-primary">
                                <select class="form-control" name="role_id" id="select-role">
                                    <option>tes</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary"><i class="fa fa-save"></i> <span id="btnSave">Simpan</span></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-undo"></i> Cancel</button>
            </div>
        </form>                    
    </div>
</div>
</div>

`;
}