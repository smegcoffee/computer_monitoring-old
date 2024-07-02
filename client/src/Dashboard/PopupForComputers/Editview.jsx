import React from 'react';
import smct from './../../img/smct.png';


function EditView({ isOpen, onClose, viewData}) {
  if (!isOpen) {
    return null; //Render nothing if isOpen is false
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-md" style={{maxWidth:'100vh', minWidth: "1000px", maxHeight:'100vh'}}>
        <div className='bg-blue-500 rounded-tr-2xl rounded-tl-2xl max-h-max p-5 flex'>
            <div className='flex-none'>
            <img src={smct} alt="SMCT Logo" className='w-60 h-24 m-0 block'></img>
            </div>
        </div>
            <div className='flex grid-cols-3'>
        <div className='text-left ml-10 mt-5 col-span-1'>
          <h5 className='text-sm mb-2'><b>Computer ID: </b>{viewData.id}</h5>
          <h5 className='text-sm mb-2'><b>Branch Code: </b>{viewData.branchCode}</h5>
          <h5 className='text-sm mb-2'><b>Name of User: </b>{viewData.name}</h5>
          <h5 className='text-sm mb-2'><b>Designation: </b>{viewData.position}</h5>
        </div>
        <div className='text-left ml-20 mt-5 col-span-1'>
          <h5 className='text-sm mb-2'><b>{viewData.category2}: </b></h5>
          <h5 className='text-sm mb-2'><textarea
          placeholder= {viewData.description} className='border border-gray-300 rounded-md pl-2'/></h5>
          <h5 className='text-sm mb-2'><b>Add Remarks: </b><input 
          placeholder= "Write Remarks..." className='border border-gray-300 rounded-md pl-2'/></h5>
          </div>
          <div className='text-left ml-20 mt-5 col-span-1 mr-10'>
          <h5 className='text-sm mb-2'><b>Unit Code: </b>{viewData.unit}</h5>
          <h5 className='text-sm mb-2'><b>Category: </b><input 
          placeholder= {viewData.category} className='border border-gray-300 rounded-md pl-2'/></h5>
          <h5 className='text-sm mb-2'><b>Status: </b><input 
          placeholder= {viewData.status} className='border border-gray-300 rounded-md pl-2'/></h5>
          <h5 className='text-sm mb-2'><b>Recent User: </b><input 
          placeholder= {viewData.recent} className='border border-gray-300 rounded-md pl-2'/></h5>
          </div>
         </div>
        <div className='flex justify-center items-center text-center pt-10 pb-10'>
            <button className='bg-gray-300 text-black rounded-3xl h-9 w-36 text-xl mr-16' onClick={onClose}>CANCEL</button>
            <button className='bg-green-600 text-white rounded-3xl h-9 w-36 text-xl'>SAVE</button>
        </div>
      </div>
    </div>
  );
}

export default EditView;
