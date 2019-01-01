const provUpd = async (province) => {
  await asyncForEach(province.province, async (el) => {
    $('#ddProvince-upd').append(`<option value="${el.id}">${el.provinceName}</option>`);
  })
  ipc.removeAllListeners('province')
}
const commodityUpd = async (com, id) => {
  await asyncForEach(com.commodity, async (el) => {
    $('#' + id).append(`<option value="${el.item_name}">${el.item_name}</option>`);
  })
  ipc.removeAllListeners('commodity')
}
const distUpd = async (district) => {
  await asyncForEach(district.district, async (el) => {
    $('#ddDistrict-upd').append(`<option value="${el.id}">${el.districtName}</option>`);
  })
  ipc.removeAllListeners('district')
}
const tehUpd = async (tehsil) => {
  await asyncForEach(tehsil.tehsil, async (el) => {
    $('#ddTehsil-upd').append(`<option value="${el.id}">${el.tehsilName}</option>`);
  })
  ipc.removeAllListeners('tehsil')
}
const ucListenerUpd = async (uc) => {
  await asyncForEach(uc.uc, async (el) => {
    $('#ddUC-upd').append(`<option value="${el.id}">${el.ucName}</option>`);
  })
  ipc.removeAllListeners('uc')
}
const hhListenerUpd = async (hh) => {
  await asyncForEach(hh.hh, async (el) => {
    $('#ddHealthHouse-upd').append(`<option value="${el.id}">${el.siteName}</option>`);
  })
  ipc.removeAllListeners('hh');
}
const staffListenerUpd = async (staffs) => {
  await asyncForEach(staffs, async (el) => {
    $('#ddStaff_code-upd').append(`<option value="${el.staff_code}">${el.staff_code}</option>`);
    $('#ddStaff_name-upd').append(`<option value="${el.staff_code}">${el.staff_name}</option>`);
  })
  ipc.removeAllListeners('haveStaff');
}
const supListenerUpd = async (_sups) => {
  await asyncForEach(_sups, async (el) => {
    $('#ddSup_code-upd').append(`<option value="${el.sup_code}">${el.sup_code}</option>`);
    $('#ddSup_name-upd').append(`<option value="${el.sup_code}">${el.sup_name}</option>`);
  })
  ipc.removeAllListeners('haveSups');
}
