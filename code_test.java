import java.util.Calendar;
import java.text.SimpleDateFormat;
import java.io.PrintWriter;
import java.io.IOException;

public class PostgreSQLJDBC {
    public static void main(String args[]) {
            String sql = "";
            int age=0;
            char gender;
            String location = "";
            String time = "";
            double kor_lattitude = 37.586228;
            double kor_longitude = 127.029027;

            double yon_lattitude = 37.565835;
            double yon_longitude = 126.938583;

            double lattitude = 0;
            double longitude = 0;

            double move=0;

            double difference_lattitude;
            double difference_longitude; // 37.586228, 127.029027
            // 37.587907, 127.020213
            // 37.579892, 127.024373
            // 0.006336 0.008814

            Calendar cal = Calendar.getInstance();

            SimpleDateFormat format1 = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");

            try {
                PrintWriter pw = new PrintWriter("C:/Users/super/out.txt");
            //FileOutputStream output = new FileOutputStream("C:/Users/laptopY/OneDrive/2019/강의/졸업 프로젝트/out.txt");
    
            for(int i=0;i<100;i++){
                age = ((int)(Math.random()*10+1))*10;
                gender = (((int)(Math.random()*2))%2==0) ? 'M' : 'F';
                sql = String.format("INSERT INTO USERS (ID, age, gender) values('test_%d@gmail.com', %d, '%s');", i, age, gender);
                //System.out.println(sql);
                //output.write(sql.getBytes());
                pw.println(sql);

                lattitude = ((((int)(Math.random()*2))%2==0) ? kor_lattitude : yon_lattitude);
                longitude = ((((int)(Math.random()*2))%2==0) ? kor_longitude : yon_longitude);
                for(int j=0;j<100;j++) {

                    move = Math.random()*0.01;

                    difference_lattitude = Math.random()*move;
                    difference_longitude = move-difference_lattitude;

                    lattitude += ((((int)(Math.random()*2))%2==0) ? -1 : 1) * difference_lattitude;
                    longitude += ((((int)(Math.random()*2))%2==0) ? -1 : 1) * difference_longitude;
                    
                    location = String.format("POINT'(%.5f, %.5f)'", longitude, lattitude);

                    cal.add(Calendar.HOUR, -1);

                    time = String.format("TIMESTAMP '%s'", format1.format(cal.getTime()));

                    sql = String.format("INSERT INTO DATA (ID, location, time) values('test_%d@gmail.com', %s, %s);",i, location, time);

                    //System.out.println(sql);
                    //output.write(sql.getBytes());
                    pw.println(sql);
                    
                    }
                cal = Calendar.getInstance();
                
                }
            pw.close();
            } catch(IOException e){
                System.out.println("꺄울!");
                //printStack
            }
            
    }
}            
