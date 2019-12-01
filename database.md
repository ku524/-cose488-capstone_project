```sql
CREATE TABLE USERS (
    ID VARCHAR(50),
    age numeric(3,0) not null,
    gender char(1) not null,
    PRIMARY KEY(ID)
);

CREATE TABLE DATA (
    ID VARCHAR(50),
    location POINT not null,
    time timestamp not null,
    FOREIGN KEY (ID) REFERENCES USERS(ID),
    primary key(ID, time)    
);

CREATE TABLE COMPANY (
    ID VARCHAR(50),
    company_name VARCHAR(50),
    phone_number VARCHAR(11) not null,
    registration_date timestamp not null,
    expiration_date timestamp not null,
    PRIMARY KEY(ID)
)


INSERT INTO USERS (ID, age, gender) values(200, 78, M);

INSERT INTO DATA (ID, location, time) values(200, POINT'(192.5, 190.1223)', TIMESTAMP '1999-01-08 04:05:06');

SELECT id, array_agg(location) as locations, array_agg(time) as times, array_agg(age) as age, array_agg(gender) as gender
FROM data natural join users
WHERE location <@ box(point($1,$2), point($3,$4)) and date(time)=$5 GROUP BY id"


```

```dockerfile
FROM node

# 앱 디렉터리 생성
WORKDIR /usr/src/app

# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY package*.json ./

RUN npm install
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production

# 앱 소스 추가
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
```

```
node_modules
npm-debug.log
```