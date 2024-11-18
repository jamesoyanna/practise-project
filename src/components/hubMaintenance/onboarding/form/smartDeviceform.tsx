import { Formik, Form, Field } from 'formik'
import Input from '@/components/ui/Input'
import SmartDeviceField from './smartTypeField'
import NetworkTypeField from './networkTypeField'
import ManufacturerNameField from '../form/manufacturerName'
import ManufacturedDateFilter from '../form/manufacturedDate'

const SmartCylinderForm = () => {
    return (
        <Formik
            initialValues={{
                owner: '',
                smartDeviceType: '',
                networkType: '',
                tarWeight: '',
                manufacturedDate: '',
                manufacturerName: '',
            }}
            onSubmit={(values, actions) => {
                console.log('Form submitted:', values)
                actions.resetForm()
            }}
        >
            {(formikProps) => (
                <Form>
                    <div className="mt-10 px-4 lg:px-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Field
                                    type="text"
                                    placeholder="Owner"
                                    name="owner"
                                    className="my-2 w-full text-sm"
                                    component={Input}
                                />
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <SmartDeviceField
                                    value={formikProps.values.smartDeviceType}
                                    onChange={(value) =>
                                        formikProps.setFieldValue(
                                            'cylinderSize',
                                            value
                                        )
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Field
                                    type="text"
                                    placeholder="Smart Device Serial No."
                                    name="deviceSerialNo"
                                    className="my-2 w-full text-sm"
                                    component={Input}
                                />
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <NetworkTypeField
                                    value={formikProps.values.networkType}
                                    onChange={(value) =>
                                        formikProps.setFieldValue(
                                            'networkType',
                                            value
                                        )
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <ManufacturedDateFilter />
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <ManufacturerNameField
                                    value={formikProps.values.manufacturerName}
                                    onChange={(value) =>
                                        formikProps.setFieldValue(
                                            'manufacturerName',
                                            value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-gray-100 text-blue-800 font-bold py-2 px-4 rounded mt-20 w-full"
                        >
                            Onboard Smart Device
                        </button>
                        <hr className="mt-4" />
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default SmartCylinderForm
