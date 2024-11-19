import { Card } from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import axiosInstance from "src/axiosInstance";
import InputForm from "src/components/InputForm";
import SelectForm from "src/components/SelectFormNext";
import { DashboardContent } from "src/layouts/dashboard";

export default function MyProfile() {
  interface TableData {
    id: number;
    position: string;
    company_id: number;
  }
  interface CompanyTable {
    id: number;
    name: string;
  }
  const [editMessage, setEditMessage] = useState("");
  const [data, setData] = useState<TableData>({
    id: 0,
    position: "",
    company_id: 0,
  });
  const [companyTypes, setCompanyTypes] = useState<CompanyTable[]>([]);
  useEffect(() => {
    document.title = "My Profile";
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/my-profile");
        const responseData = response.data;
        if (responseData.status == "success") {
          setData({
            id: responseData.data.id,
            position: responseData.data.position,
            company_id: responseData.data.company_id,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCompany = async () => {
      try {
        const response = await axiosInstance.get("/companies");
        const responseData = response.data;
        if (responseData.status == "success") {
          setCompanyTypes(
            responseData.data.map((item: CompanyTable) => ({
              id: item.id,
              name: item.name,
            }))
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompany();
    fetchProfile();
  }, []);
  const handleEditSubmit = async (
    values: TableData,
    { setSubmitting, resetForm }: FormikHelpers<TableData>
  ) => {
    try {
      const formData = new FormData();
      formData.append("position", values.position);
      formData.append("company_id", values.company_id.toString());
      const response = await axiosInstance.post(`/my-profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const responseData = response.data;
      console.log(responseData);
      if (responseData.status == "success") {
        setEditMessage(responseData.message);
        setData({
          id: responseData.data.id,
          position: responseData.data.position,
          company_id: responseData.data.company_id,
        });
        resetForm();
      } else {
        setEditMessage(responseData.message);
      }
    } catch (error) {
      setEditMessage(`My profile update failed! Please try again.`);
      console.log(error);
    }
    setSubmitting(false);
  };
  return (
    <DashboardContent>
      <Card>
        <Formik
          initialValues={{
            id: data.id,
            position: data.position,
            company_id: data.company_id,
          }}
          enableReinitialize={true}
          onSubmit={handleEditSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="space-y-4 bg-white text-gray-800 p-6 max-w-[600px]">
              <div className="mb-4">
                <Field
                  type="text"
                  label="Company"
                  as={SelectForm}
                  items={companyTypes}
                  selectedKey={values.company_id?.toString()}
                  onSelectionChange={(selectedCompanyId: string) => {
                    setFieldValue("company_id", selectedCompanyId);
                  }}
                  name="company_id"
                  className="mt-1 block w-full py-2 "
                />
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  label="Position"
                  as={InputForm}
                  name="position"
                  className="mt-1 block w-full py-2 "
                />
              </div>
              <div className="text-center text-green-500">{editMessage}</div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500"
              >
                Update Profile
              </button>
            </Form>
          )}
        </Formik>
      </Card>
    </DashboardContent>
  );
}
