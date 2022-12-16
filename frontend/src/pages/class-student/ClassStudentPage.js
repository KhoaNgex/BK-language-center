import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  Typography,
  Grid,
  Container
} from "@mui/material";
import Iconify from "../../components/iconify";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const testClassList = [
  {
    class_id: "2022-04",
    start_date: "2022-10-01",
    end_date: "2023-01-02",
    form: "offline",
    branch_id: "SG01",
    room: "201",
    time: "20:00-23:00",
    teacher_name: "Nguyen Thi Thu Thao",
    status: "incoming",
    numOfStudent: 20,
    maxStudent: 20,
    studentStatus: 1,
  },

  {
    class_id: "2022-05",
    start_date: "2022-10-01",
    end_date: "2023-01-02",
    form: "offline",
    branch_id: "SG01",
    room: "201",
    time: "20:00-23:00",
    teacher_name: "Nguyen Thi Thu Thao",
    status: "current",
    numOfStudent: 5,
    maxStudent: 20,
    studentStatus: 0,
  },

  {
    class_id: "2022-06",
    start_date: "2022-10-01",
    end_date: "2023-01-02",
    form: "online",
    branch_id: null,
    room: null,
    time: "20:00-23:00",
    teacher_name: "Nguyen Thi Thu Thao",
    status: "incoming",
    numOfStudent: 4,
    maxStudent: 20,
    studentStatus: 2,
  },

  {
    class_id: "2022-07",
    start_date: "2022-10-01",
    end_date: "2023-01-02",
    form: "offline",
    branch_id: "SG01",
    room: "201",
    time: "20:00-23:00",
    teacher_name: "Nguyen Thi Thu Thao",
    status: "incoming",
    numOfStudent: 5,
    maxStudent: 20,
    studentStatus: 3,
  },
]

// NOTE: not yet complete, testing purpose only
export default function ClassStudentPage() {
  const [classList, setClassList] = useState(testClassList);
  const navigate = useNavigate();
  const { id } = useParams();

  const navToCourse = () => {
    navigate(`/student/course/${id}`, { replace: true });
  };

  return (
    <Container>

      <Button
        startIcon={<Iconify icon="material-symbols:arrow-back" />}
        onClick={navToCourse}
        sx={{ mb: 2 }}
      >
        Quay lại
      </Button>
      <Typography variant="h2" gutterBottom>
        {id}
      </Typography>

      <Grid container spacing={2}>
        {classList
          .map((_class, idx) => {
            const {
              class_id,
              start_date,
              end_date,
              form,
              branch_id,
              room,
              time,
              teacher_name,
              numOfStudent,
              maxStudent,
              studentStatus } = _class;

            return (
              <Grid item xs={6}>
                <Card sx={{ minWidth: 275, height: "100%" }}>

                  <CardHeader
                    action={
                      <Typography variant="h5" color={numOfStudent === maxStudent ? "red" : "green"}>
                        {numOfStudent} / {maxStudent}
                      </Typography>
                    }
                    title={
                      <Typography variant="h3" color="blue">
                        {class_id}
                      </Typography>
                    }
                    subheader={
                      <Typography
                        variant="subtitle1"
                        sx={{ fontStyle: "italic" }}
                        color={
                          (studentStatus === 1) ? "red" : (studentStatus === 2) ? "gray" : "green"
                        }
                      >
                        {
                          (studentStatus === 1) ? "Đã đạt số lượng đăng ký tối đa" : (studentStatus === 2) ? "Đang đợi xác nhận..." : (studentStatus === 3) ? "Xác nhận đăng ký thành công" : <br />
                        }
                      </Typography>
                    }
                  />

                  <CardContent>
                    <Typography variant="body2">

                      <b>Ngày bắt đầu:</b> {start_date}
                      <br />
                      <b>Ngày kết thúc:</b> {end_date}
                      <br />
                      <b>Hình thức:</b> {form}
                      <br />
                      <b>Chi nhánh:</b> {branch_id}
                      <br />
                      <b>Phòng:</b> {room}
                      <br />
                      <b>Thời gian học:</b> {time}
                      <br />
                      <b>Giảng viên:</b> {teacher_name}

                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      sx={{ fontSize: "13px", borderRadius: 30, margin: "0 auto 15px" }}
                      startIcon={<Iconify icon="eva:plus-fill" />}
                      disabled={(studentStatus === 0) ? false : true}
                    >
                      Đăng ký lớp học
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>

    </Container>
  );
}
