module.exports = `
<div class="container" id="scrChildDivv2">
  <div class="row">
    <form action="#" id="myForm">
      <div class="form-group row">
        <label for="ddProvince" class="col-sm-1 col-form-label">Province:</label>
        <div class="col-sm-2">
          <select id="ddProvince" class="form-control form-control-sm">
            <option value="">Select One</option>
          </select>
        </div>
        <label for="ddDistrict" class="col-sm-1 col-form-label">District:</label>
        <div class="col-sm-2">
          <select id="ddDistrict" class="form-control form-control-sm">
            <option value="">Select One</option>
          </select>
        </div>
        <label for="ddTehsil" class="col-sm-1 col-form-label">Tehsil:</label>
        <div class="col-sm-2">
          <select id="ddTehsil" class="form-control form-control-sm">
            <option value="">Select One</option>
          </select>
        </div>
        <label for="ddUC" class="col-sm-1 col-form-label">UC:</label>
        <div class="col-sm-2">
          <select id="ddUC" class="form-control form-control-sm">
            <option value="">Select One</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="ddHealthHouse" class="col-sm-1 col-form-label">Site Name:</label>
        <div class="col-sm-2">
          <select name="ddHealthHouse" id="ddHealthHouse" class="form-control form-control-sm">
            <option value="">Select One</option>
          </select>
        </div>
        <label for="txtSiteType" class="col-sm-1 col-form-label">Site Type:</label>
        <div class="col-sm-2">
          <input type="text" readonly id="txtSiteType" class="form-control form-control-sm">
        </div>
        <label for="txtVillage" class="col-sm-1 col-form-label">Village:</label>
        <div class="col-sm-2">
          <input type="text" name="txtVillage" class="form-control form-control-sm">
        </div>
        <label for="txtStaffName" class="col-sm-1 col-form-label">Staff Name:</label>
        <div class="col-sm-2">
          <input type="text" name="txtStaffName" class="form-control form-control-sm">
        </div>
      </div>
      <div class="form-group row">
        <label for="scrChildScrType" class="col-sm-1 col-form-label">Screening Type</label>
        <div class="col-sm-5">
          <select name="scrChildScrType" id="scrChildScrType" class="form-control form-control-sm">
            <option value="">Select One</option>
            <option value="1">Active</option>
            <option value="0">Passive</option>
          </select>
        </div>
        <label for="txtStaffName" class="col-sm-1 col-form-label">Screening Date:</label>
        <div class="col-sm-5">
          <input type="date" name="txtScrChildDate" id="txtScrChildDate" class="form-control form-control-sm">
        </div>
      </div>
      <div class="table-responsive">
        <div id="jsGrid"></div>
      </div>
      <div class="form-group row">
        <div class="offset-sm-10 col-sm-2">
          <button type="submit" class="btn btn-primary" id="formSub">Save</button>
        </div>
      </div>
    </form>
  </div>
</div>
`