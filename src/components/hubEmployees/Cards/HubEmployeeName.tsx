import React, { useEffect, useState, useRef } from 'react';
import { Avatar, Card, Dropdown } from '@/components/ui';
import { gethubEmployeeDetails, useAppDispatch, useAppSelector } from '@/store/slices/employees/details';
import {  MdCameraAlt, MdDeselect, MdBadge } from 'react-icons/md';
import { FaPhoneAlt, FaUser } from 'react-icons/fa';
import Input from '@/components/ui/Input';
import DesignationField from '../DesignationField';
import LocalGovernmentField from '../LocalGovernmentField';
import { Formik, Form, Field } from 'formik';
import type { ChangeEvent } from 'react';
import Button from '@/components/ui/Button';


type EmployeeDetailProps = {
  staffId?: string;
};

const formatDate = (dateString: string | number | Date) => {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const HubEmployeeName = ({ staffId }: EmployeeDetailProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        if (typeof staffId === 'string') {
          dispatch(gethubEmployeeDetails(staffId));
        }
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeDetails();
  }, [staffId, dispatch]);

  const testdata = useAppSelector((state) => state);
  const isHubEmployeeDetailsLoading = testdata.hubEmployeeDetails.data.loading;
  const hubEmployeeDetailsData = testdata.hubEmployeeDetails.data.hubEmployeeDetailDataList;

  console.log('hubEmployeeDetailsData :', hubEmployeeDetailsData);

  const [imageSrc, setImageSrc] = useState(hubEmployeeDetailsData.img); // State for image URL
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string); // Update the imageSrc state with the selected image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-2">
         <Button
            variant="solid"
            color="red-600"
             size="md"
             icon={<MdDeselect />} 
             className="w-full lg:w-auto"
        >
            Deactivate employee
        </Button>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Card 1 */}
        <Card className="bg-[#f9f9f9]" clickable={true}>
          <div className="flex">
            <div className="flex items-center justify-between gap-8">
              {/* Left Side */}
              <div className="flex flex-col gap-4 relative">
                <div className="w-[8rem] h-[8rem] rounded-full bg-[#f9f9f9] shadow-md p-2 relative">
                  <img
                    src={imageSrc}
                    alt={hubEmployeeDetailsData.employeeName}
                    className="w-[100%] h-[100%] rounded-full"
                  />
                  <div
                    className="absolute bottom-2 right-2 bg-[#194DA3] rounded-full p-1 cursor-pointer"
                    onClick={handleCameraClick}
                  >
                    <MdCameraAlt className="text-white" />
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              {/* Right Side */}
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="">{hubEmployeeDetailsData.employeeName}</h4>
                  <p>
                    Date Registered: {formatDate(hubEmployeeDetailsData.dateRegistered)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4"></div>
          </div>
        </Card>

        {/* Card 2 */}
        <Card className="bg-[#f9f9f9]" clickable={true}>
          <div>
            <div className="flex items-center justify-between gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-5">
                  <Avatar icon={<FaUser />} size="sm" />
                  <span>
                    <small>Staff ID</small>
                    <p>{hubEmployeeDetailsData.staffId}</p>
                  </span>
                </div>
                <div className="flex items-center gap-5">
                  <Avatar icon={<MdBadge />} size="sm" />
                  <span>
                    <small>Designation</small>
                    <p>{hubEmployeeDetailsData.designation}</p>
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-5">
                  <Avatar icon={<FaPhoneAlt />} size="sm" />
                  <span>
                    <small>Phone Number</small>
                    <p>{hubEmployeeDetailsData.hubEmployeePhoneNo}</p>
                  </span>
                </div>
                <div className="flex items-center gap-3 border rounded p-2 bg-[#194DA3] text-white">
                  <p className="font-bold">View More</p>
                  <Dropdown
                    menuStyle={{
                      minWidth: 230,
                      alignItems: 'start',
                    }}
                    placement="bottom-end"
                    trigger="click"
                  >
                    <Dropdown.Item variant="header">
                      <div className="py-2 px-3 items-center gap-2 text-gray-500">
                        <div className="flex items-center gap-5">
                          <Avatar icon={<FaUser />} size="sm" />
                          <span>
                            <small>Next of Kin Name</small>
                            <p className="text-gray-800">
                              {hubEmployeeDetailsData.nextOfKin.nokName}
                            </p>
                          </span>
                        </div>
                        <div className="flex items-center gap-5 mt-3">
                          <Avatar icon={<FaUser />} size="sm" />
                          <span>
                            <small>Relationship</small>
                            <p className="text-gray-800">
                              {hubEmployeeDetailsData.nextOfKin.nokRelationship}
                            </p>
                          </span>
                        </div>
                        <div className="flex items-center gap-5 mt-3">
                          <Avatar icon={<FaPhoneAlt />} size="sm" />
                          <span>
                            <small>Phone Number</small>
                            <p>{hubEmployeeDetailsData.nextOfKin.nokPhoneNo}</p>
                          </span>
                        </div>
                      </div>
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4"></div>
          </div>
        </Card>
      </div>

      <Formik
        initialValues={{
          phoneNumber: '',
          serviceCustomerType: '',
          designation: hubEmployeeDetailsData.designation || '',
          localGovernment: hubEmployeeDetailsData.servicingLocalGovernment || [],
        }}
        onSubmit={(values, actions) => {
          console.log('Form submitted:', values);
          actions.resetForm();
        }}
      >
        {formikProps => (
          <Form>
            <div className="mt-10 px-4 lg:px-0">
              <h4 className="text-lg mb-4">Update Profile</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <small>Phone Number</small>
                  <Field
                    type="tel"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    className="my-2 w-full text-sm"
                    component={Input}
                  />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <small>Designation</small>
                  <DesignationField
                    value={formikProps.values.designation}
                    onChange={value => formikProps.setFieldValue('designation', value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <small>Service Customer Type</small>
                  <Field
                    type="text"
                    placeholder="Business (B2B)"
                    name="serviceCustomerType"
                    className="my-2 w-full text-sm"
                    component={Input}
                  />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <small>Servicing Local Government</small>
                  <LocalGovernmentField
                    value={formikProps.values.localGovernment}
                    onChange={value => formikProps.setFieldValue('localGovernment', value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#194DA3] text-white font-bold py-2 px-4 rounded mt-4 w-full"
              >
                Save Changes
              </button>
              <hr className="mt-4" />
            </div>
          </Form>
        )}
      </Formik>

      <div className="mt-4">
        <h4>Password</h4>
        <button
          type="submit"
          className="bg-[#194DA3] text-white font-bold py-2 px-4 rounded mt-4"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default HubEmployeeName;