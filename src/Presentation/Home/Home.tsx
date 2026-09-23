import React from 'react';
import { ScrollView } from 'react-native';

import HomeAd from './components/HomeAd.component';
import Nav from './components/Nav.component';
import { CourseCategory } from '@app/Models/course.model';
import ForceUpdateScreen from '@app/Presentation/ForceUpdate/ForceUpdateScreen';

const Home: React.FC = ({ navigation }: any) => {
  const goCourse = (category: CourseCategory, title: string) => {
    navigation.navigate('Course', {
      category: category,
      title,
    });
  };

  const goMenu = (name: string) => navigation.navigate(name);

  return (
    <ScrollView>
      <ForceUpdateScreen />
      <HomeAd />
      <Nav
        bgColor="#22A699"
        title="Genel Almanca"
        subtitle="Almanca diyalog çalışmaları"
        goCourse={() => goCourse('general', 'Genel Almanca')}
        navImage={require('@assets/home/c1.png')}
      />
      <Nav
        bgColor="#F2BE22"
        title="Mülakat"
        subtitle="Almanca mülakat hazırlıkları"
        goCourse={() => goCourse('interview', 'Mülakat')}
        navImage={require('@assets/home/c2.png')}
      />
      <Nav
        bgColor="#F29727"
        title="Sınav Hazırlık"
        subtitle="Sınava yönelik diyalog ve planen çalışmaları"
        goCourse={() => goCourse('exam-preparation', 'Sınav Hazırlık')}
        navImage={require('@assets/home/c3.png')}
      />
      <Nav
        bgColor="#F24C3D"
        title="Resim Yorumlama"
        subtitle="Resimler hakkında konuşun"
        goCourse={() => goCourse('image-describe', 'Resim Yorumlama')}
        navImage={require('@assets/home/c4.png')}
      />
      <Nav
        bgColor="#007eb8"
        title="Robotum"
        subtitle="Kendi robotunuzu oluşturun"
        navImage={require('@assets/robot/robot.png')}
        menu={true}
        goMenu={() => goMenu('Robotum')}
      />
      <Nav
        bgColor="#ff335a"
        title="Yardım"
        subtitle="Yardım & Destek"
        navImage={require('@assets/home/help.png')}
        menu={true}
        goMenu={() => goMenu('Help')}
      />
    </ScrollView>
  );
};

export default Home;
