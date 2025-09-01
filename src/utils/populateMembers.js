// Utility script to populate church members into the database
// This can be run from the admin interface or as a one-time migration

import { supabase } from '../services/supabaseClient'

// Church members data parsed from the original list
const churchMembers = [
  { name: 'Abel Omwenga Okindo', firstName: 'Abel Omwenga', lastName: 'Okindo' },
  { name: 'Abraham Sindani Sayah', firstName: 'Abraham Sindani', lastName: 'Sayah' },
  { name: 'Agnes Kerubo Nyabuto', firstName: 'Agnes Kerubo', lastName: 'Nyabuto' },
  { name: 'Agnes Wairimu Ndungu', firstName: 'Agnes Wairimu', lastName: 'Ndungu' },
  { name: 'Aliet Irima Njue', firstName: 'Aliet Irima', lastName: 'Njue' },
  { name: 'Allan Onyango Kobiya', firstName: 'Allan Onyango', lastName: 'Kobiya' },
  { name: 'Amina Wambui Githinjii', firstName: 'Amina Wambui', lastName: 'Githinjii' },
  { name: 'Ann Nkantha Lusasi', firstName: 'Ann Nkantha', lastName: 'Lusasi' },
  { name: 'Annah Kemunto Bonareri', firstName: 'Annah Kemunto', lastName: 'Bonareri' },
  { name: 'Arnold Nabishwa Masete', firstName: 'Arnold Nabishwa', lastName: 'Masete' },
  { name: 'Asitiba Kitahi Isaiah', firstName: 'Asitiba Kitahi', lastName: 'Isaiah' },
  { name: 'Beatrice Achieng\' Abade', firstName: 'Beatrice', lastName: 'Achieng\' Abade' },
  { name: 'Beatrice Akinyi Odindo', firstName: 'Beatrice Akinyi', lastName: 'Odindo' },
  { name: 'Belinda Apondi Mboya', firstName: 'Belinda Apondi', lastName: 'Mboya' },
  { name: 'Benard Osoro Mogere', firstName: 'Benard Osoro', lastName: 'Mogere' },
  { name: 'Benard Otieno Nyakoni', firstName: 'Benard Otieno', lastName: 'Nyakoni' },
  { name: 'Betty Bosibori Mangara', firstName: 'Betty Bosibori', lastName: 'Mangara' },
  { name: 'Bonface Mbatha Kimia', firstName: 'Bonface Mbatha', lastName: 'Kimia' },
  { name: 'Boniface Wesonga Oduor', firstName: 'Boniface Wesonga', lastName: 'Oduor' },
  { name: 'Cannizzaro Obiero Ouno', firstName: 'Cannizzaro Obiero', lastName: 'Ouno' },
  { name: 'Carolyn Muiti Mutiga Shem', firstName: 'Carolyn Muiti', lastName: 'Mutiga Shem' },
  { name: 'Carolyne Wanzuu Kyalo', firstName: 'Carolyne Wanzuu', lastName: 'Kyalo' },
  { name: 'Catherine Ombati', firstName: 'Catherine', lastName: 'Ombati' },
  { name: 'Catherine Mathei Munyao', firstName: 'Catherine Mathei', lastName: 'Munyao' },
  { name: 'Catherine Theke Kavya', firstName: 'Catherine Theke', lastName: 'Kavya' },
  { name: 'Charles Chacha Ghati', firstName: 'Charles Chacha', lastName: 'Ghati' },
  { name: 'Charles Kyalo Simon', firstName: 'Charles Kyalo', lastName: 'Simon' },
  { name: 'Charles Nyagero Nyamwero', firstName: 'Charles Nyagero', lastName: 'Nyamwero' },
  { name: 'Charles Ochieng\' Owiti', firstName: 'Charles', lastName: 'Ochieng\' Owiti' },
  { name: 'Christine Achieng Okungu', firstName: 'Christine Achieng', lastName: 'Okungu' },
  { name: 'Christine Kerubo Ongere', firstName: 'Christine Kerubo', lastName: 'Ongere' },
  { name: 'Christine Nakhumicha Masundi', firstName: 'Christine Nakhumicha', lastName: 'Masundi' },
  { name: 'Collette Abay Migwambo', firstName: 'Collette Abay', lastName: 'Migwambo' },
  { name: 'Consolata Nyaguthie Kamau', firstName: 'Consolata Nyaguthie', lastName: 'Kamau' },
  { name: 'Cornelius Muthuku Mwau', firstName: 'Cornelius Muthuku', lastName: 'Mwau' },
  { name: 'Damaris Nyaboke Moruri', firstName: 'Damaris Nyaboke', lastName: 'Moruri' },
  { name: 'Daniel Otieno Odhiambo', firstName: 'Daniel Otieno', lastName: 'Odhiambo' },
  { name: 'Daniel Wambua', firstName: 'Daniel', lastName: 'Wambua' },
  { name: 'Danson Kimani Njeri', firstName: 'Danson Kimani', lastName: 'Njeri' },
  { name: 'David Anditi Juma', firstName: 'David Anditi', lastName: 'Juma' },
  { name: 'David Ayusa Ogero', firstName: 'David Ayusa', lastName: 'Ogero' },
  { name: 'Dennis Ondieki Okiko', firstName: 'Dennis Ondieki', lastName: 'Okiko' },
  { name: 'Derrick Gento Ghati', firstName: 'Derrick Gento', lastName: 'Ghati' },
  { name: 'Desmond N. Allan Otieno', firstName: 'Desmond N.', lastName: 'Allan Otieno' },
  { name: 'Domnick Maranga Obegi', firstName: 'Domnick Maranga', lastName: 'Obegi' },
  { name: 'Dorah Awuor Nyakwaka', firstName: 'Dorah Awuor', lastName: 'Nyakwaka' },
  { name: 'Dorcas Wambui Murigi', firstName: 'Dorcas Wambui', lastName: 'Murigi' },
  { name: 'Doris Nyamonge Bundi', firstName: 'Doris Nyamonge', lastName: 'Bundi' },
  { name: 'Dorus Sibota Onchieku', firstName: 'Dorus Sibota', lastName: 'Onchieku' },
  { name: 'Duncan Dalmas Godia', firstName: 'Duncan Dalmas', lastName: 'Godia' },
  { name: 'Duncan Mageto Atati', firstName: 'Duncan Mageto', lastName: 'Atati' },
  { name: 'Edna Kerubo Mecha', firstName: 'Edna Kerubo', lastName: 'Mecha' },
  { name: 'Edna Nyakerario Kiriama', firstName: 'Edna Nyakerario', lastName: 'Kiriama' },
  { name: 'Edward Mangara Ongeta', firstName: 'Edward Mangara', lastName: 'Ongeta' },
  { name: 'Edwina Adhiambo Bolos', firstName: 'Edwina Adhiambo', lastName: 'Bolos' },
  { name: 'Effie Muthoni Wambua', firstName: 'Effie Muthoni', lastName: 'Wambua' },
  { name: 'Elijah Ouma Odero', firstName: 'Elijah Ouma', lastName: 'Odero' },
  { name: 'Eliud Luvonga Shiyonga', firstName: 'Eliud Luvonga', lastName: 'Shiyonga' },
  { name: 'Elizabeth Nyabonyi Henry', firstName: 'Elizabeth Nyabonyi', lastName: 'Henry' },
  { name: 'Elizabeth Sapato Nkure', firstName: 'Elizabeth Sapato', lastName: 'Nkure' },
  { name: 'Elizabeth Wangari Mwangi', firstName: 'Elizabeth Wangari', lastName: 'Mwangi' },
  { name: 'Elizabeth Wayua Isaiah', firstName: 'Elizabeth Wayua', lastName: 'Isaiah' },
  { name: 'Emilly Adhiambo Bodo', firstName: 'Emilly Adhiambo', lastName: 'Bodo' },
  { name: 'Emmanuel Oginga Ochieng\'', firstName: 'Emmanuel Oginga', lastName: 'Ochieng\'' },
  { name: 'Ephraim Ouma Ojiem', firstName: 'Ephraim Ouma', lastName: 'Ojiem' },
  { name: 'Eric Oyunge Mogeni', firstName: 'Eric Oyunge', lastName: 'Mogeni' },
  { name: 'Erick Nyamweya Kibagendi', firstName: 'Erick Nyamweya', lastName: 'Kibagendi' },
  { name: 'Erick Yonni Oloo', firstName: 'Erick Yonni', lastName: 'Oloo' },
  { name: 'Esther Mutheu Mwengei', firstName: 'Esther Mutheu', lastName: 'Mwengei' },
  { name: 'Esther Muthoni Nyutu', firstName: 'Esther Muthoni', lastName: 'Nyutu' },
  { name: 'Esther N. Benard', firstName: 'Esther N.', lastName: 'Benard' },
  { name: 'Esther Wairimu Kamau', firstName: 'Esther Wairimu', lastName: 'Kamau' },
  { name: 'Esther Wanjiku Ngoco', firstName: 'Esther Wanjiku', lastName: 'Ngoco' },
  { name: 'Esther Wanjiru Wambui', firstName: 'Esther Wanjiru', lastName: 'Wambui' },
  { name: 'Eunice Mbinya', firstName: 'Eunice', lastName: 'Mbinya' },
  { name: 'Evaline Akinyi Abura', firstName: 'Evaline Akinyi', lastName: 'Abura' },
  { name: 'Evans Kombo Nyamichaba', firstName: 'Evans Kombo', lastName: 'Nyamichaba' },
  { name: 'Evans Onchwari Nyariki', firstName: 'Evans Onchwari', lastName: 'Nyariki' },
  { name: 'Everline Kemunto Magwaro', firstName: 'Everline Kemunto', lastName: 'Magwaro' },
  { name: 'Everlyn Atieno Okello', firstName: 'Everlyn Atieno', lastName: 'Okello' },
  { name: 'Ezna Kerubo Omwenga', firstName: 'Ezna Kerubo', lastName: 'Omwenga' },
  { name: 'Ezna Nyangara Nyamiyo', firstName: 'Ezna Nyangara', lastName: 'Nyamiyo' },
  { name: 'Ezra Amenya Nyabuto', firstName: 'Ezra Amenya', lastName: 'Nyabuto' },
  { name: 'Faith Atema Ambululi', firstName: 'Faith Atema', lastName: 'Ambululi' },
  { name: 'Faith Faiza Jemeli', firstName: 'Faith Faiza', lastName: 'Jemeli' },
  { name: 'Faith Mwende Kelly', firstName: 'Faith Mwende', lastName: 'Kelly' },
  { name: 'Florence Kwamboka Mang\'ara', firstName: 'Florence Kwamboka', lastName: 'Mang\'ara' },
  { name: 'Fred Osoro Maeri', firstName: 'Fred Osoro', lastName: 'Maeri' },
  { name: 'Frederick Odhiambo Oduor', firstName: 'Frederick Odhiambo', lastName: 'Oduor' },
  { name: 'George Ondima Nyambane', firstName: 'George Ondima', lastName: 'Nyambane' },
  { name: 'Gideon Makori', firstName: 'Gideon', lastName: 'Makori' },
  { name: 'Gladys Moraa Arita', firstName: 'Gladys Moraa', lastName: 'Arita' },
  { name: 'Godfrey Njuguna Mwangi', firstName: 'Godfrey Njuguna', lastName: 'Mwangi' },
  { name: 'Godwin O Rapemo', firstName: 'Godwin O', lastName: 'Rapemo' },
  { name: 'Gordon Onyango Odhiambo', firstName: 'Gordon Onyango', lastName: 'Odhiambo' },
  { name: 'Hellen', firstName: 'Hellen', lastName: '' },
  { name: 'Hellen Kasese Kiteme', firstName: 'Hellen Kasese', lastName: 'Kiteme' },
  { name: 'Henry Hanah Nyarangi', firstName: 'Henry Hanah', lastName: 'Nyarangi' },
  { name: 'Henry Njiru Nyaga', firstName: 'Henry Njiru', lastName: 'Nyaga' },
  { name: 'Hezron Karuga Maina', firstName: 'Hezron Karuga', lastName: 'Maina' },
  { name: 'Ian Ochieng Kobiya', firstName: 'Ian Ochieng', lastName: 'Kobiya' },
  { name: 'Jacinta Anyango Okeyo', firstName: 'Jacinta Anyango', lastName: 'Okeyo' },
  { name: 'Jackline Mukiri Muriuki', firstName: 'Jackline Mukiri', lastName: 'Muriuki' },
  { name: 'Jael Akumu Odeny', firstName: 'Jael Akumu', lastName: 'Odeny' },
  { name: 'James Mauti Mogere', firstName: 'James Mauti', lastName: 'Mogere' },
  { name: 'James Mwangu Ochiena', firstName: 'James Mwangu', lastName: 'Ochiena' },
  { name: 'James Mwenda Daniel', firstName: 'James Mwenda', lastName: 'Daniel' },
  { name: 'James Otieno Okola', firstName: 'James Otieno', lastName: 'Okola' },
  { name: 'Jane Atieno Musa', firstName: 'Jane Atieno', lastName: 'Musa' },
  { name: 'Jane Nyakerario Nyantika', firstName: 'Jane Nyakerario', lastName: 'Nyantika' },
  { name: 'Jane Wanjiru Nga\'nga\'', firstName: 'Jane Wanjiru', lastName: 'Nga\'nga\'' },
  { name: 'Janet Achieng Achieng', firstName: 'Janet Achieng', lastName: 'Achieng' },
  { name: 'Janet Ngendo Kaharuka', firstName: 'Janet Ngendo', lastName: 'Kaharuka' },
  { name: 'Janet Waithera Gachugi', firstName: 'Janet Waithera', lastName: 'Gachugi' },
  { name: 'Jeniffer', firstName: 'Jeniffer', lastName: '' },
  { name: 'Jeniffer Kambua Nzuki', firstName: 'Jeniffer Kambua', lastName: 'Nzuki' },
  { name: 'Joan Wairimu Wanjiru', firstName: 'Joan Wairimu', lastName: 'Wanjiru' },
  { name: 'Joan Janet Adhiambo Ouma', firstName: 'Joan Janet Adhiambo', lastName: 'Ouma' },
  { name: 'Joan Nyaboke Otwori', firstName: 'Joan Nyaboke', lastName: 'Otwori' },
  { name: 'Joash Otieno Maguthu', firstName: 'Joash Otieno', lastName: 'Maguthu' },
  { name: 'John Isoe Omwange', firstName: 'John Isoe', lastName: 'Omwange' },
  { name: 'John Kamau Ndungu', firstName: 'John Kamau', lastName: 'Ndungu' },
  { name: 'John Mong\'Are Twara', firstName: 'John', lastName: 'Mong\'Are Twara' },
  { name: 'John Onchwara Mogaka', firstName: 'John Onchwara', lastName: 'Mogaka' },
  { name: 'Joseph Mbondo Kimilu', firstName: 'Joseph Mbondo', lastName: 'Kimilu' },
  { name: 'Joseph Ogaro Nyambane', firstName: 'Joseph Ogaro', lastName: 'Nyambane' },
  { name: 'Joshua Momanyi Mauti', firstName: 'Joshua Momanyi', lastName: 'Mauti' },
  { name: 'Josphine Bosibori Mongare', firstName: 'Josphine Bosibori', lastName: 'Mongare' },
  { name: 'Joyce Anyango Odhiambo', firstName: 'Joyce Anyango', lastName: 'Odhiambo' },
  { name: 'Joyce Bosibori Momanyi', firstName: 'Joyce Bosibori', lastName: 'Momanyi' },
  { name: 'Joyce Kwamboka Ngure', firstName: 'Joyce Kwamboka', lastName: 'Ngure' },
  { name: 'Joyce Nyambura Wairimu', firstName: 'Joyce Nyambura', lastName: 'Wairimu' },
  { name: 'Joyce Wanza Kikuvi', firstName: 'Joyce Wanza', lastName: 'Kikuvi' },
  { name: 'Judith Jaji Deya', firstName: 'Judith Jaji', lastName: 'Deya' },
  { name: 'Julius Mwenda Mwinga', firstName: 'Julius Mwenda', lastName: 'Mwinga' },
  { name: 'Justus Onkware Arita', firstName: 'Justus Onkware', lastName: 'Arita' },
  { name: 'Kefa Nyakundi Nyaanga', firstName: 'Kefa Nyakundi', lastName: 'Nyaanga' },
  { name: 'Kelvin Karani Gerald', firstName: 'Kelvin Karani', lastName: 'Gerald' },
  { name: 'Kennedy Hodges Machoka', firstName: 'Kennedy Hodges', lastName: 'Machoka' },
  { name: 'Kennedy Mosaisi Sengera', firstName: 'Kennedy Mosaisi', lastName: 'Sengera' },
  { name: 'Kennedy Omondi Kogallo', firstName: 'Kennedy Omondi', lastName: 'Kogallo' },
  { name: 'Kenneth Malombe Ngemu', firstName: 'Kenneth Malombe', lastName: 'Ngemu' },
  { name: 'Kenneth Ouko Alego', firstName: 'Kenneth Ouko', lastName: 'Alego' },
  { name: 'Kevin Yarshone Odhiambo', firstName: 'Kevin Yarshone', lastName: 'Odhiambo' },
  { name: 'Lameck Gwaro Nyantika', firstName: 'Lameck Gwaro', lastName: 'Nyantika' },
  { name: 'Laura Muia Asuzi', firstName: 'Laura Muia', lastName: 'Asuzi' },
  { name: 'Lazarus Ogero Magwaro', firstName: 'Lazarus Ogero', lastName: 'Magwaro' },
  { name: 'Lenna Kisuza Makhungu', firstName: 'Lenna Kisuza', lastName: 'Makhungu' },
  { name: 'Lilian Wangari Nyutu', firstName: 'Lilian Wangari', lastName: 'Nyutu' },
  { name: 'Lilian Wanjiku Gathoni', firstName: 'Lilian Wanjiku', lastName: 'Gathoni' },
  { name: 'Linet Kerubo Keoye', firstName: 'Linet Kerubo', lastName: 'Keoye' },
  { name: 'Linet Owuor', firstName: 'Linet', lastName: 'Owuor' },
  { name: 'Loreen Kemuma', firstName: 'Loreen', lastName: 'Kemuma' },
  { name: 'Lorna Atieno Ouma', firstName: 'Lorna Atieno', lastName: 'Ouma' },
  { name: 'Luizer Staphanie Anditi', firstName: 'Luizer Staphanie', lastName: 'Anditi' },
  { name: 'Lydia Kerubo Magata', firstName: 'Lydia Kerubo', lastName: 'Magata' },
  { name: 'Malvine Awuor Anyando', firstName: 'Malvine Awuor', lastName: 'Anyando' },
  { name: 'Margaret Moraa Nyambati', firstName: 'Margaret Moraa', lastName: 'Nyambati' },
  { name: 'Margaret Machuma Wechuli', firstName: 'Margaret Machuma', lastName: 'Wechuli' },
  { name: 'Margaret Njeri Kyalo', firstName: 'Margaret Njeri', lastName: 'Kyalo' },
  { name: 'Margaret Wambui Kamau', firstName: 'Margaret Wambui', lastName: 'Kamau' },
  { name: 'Marion Kerubo Osiemo', firstName: 'Marion Kerubo', lastName: 'Osiemo' },
  { name: 'Martha Akinyi Otieno', firstName: 'Martha Akinyi', lastName: 'Otieno' },
  { name: 'Mary Muthoni Gitau', firstName: 'Mary Muthoni', lastName: 'Gitau' },
  { name: 'Mary Njeri Njoroge', firstName: 'Mary Njeri', lastName: 'Njoroge' },
  { name: 'Mary Nyabonyi Momanyi', firstName: 'Mary Nyabonyi', lastName: 'Momanyi' },
  { name: 'Mary Wangui Murigi', firstName: 'Mary Wangui', lastName: 'Murigi' },
  { name: 'Mathew Nderu Wachira', firstName: 'Mathew Nderu', lastName: 'Wachira' },
  { name: 'Maureen Atieno Mbawi', firstName: 'Maureen Atieno', lastName: 'Mbawi' },
  { name: 'Mercy Kitethya Jared', firstName: 'Mercy Kitethya', lastName: 'Jared' },
  { name: 'Mercy Wairimu Karani', firstName: 'Mercy Wairimu', lastName: 'Karani' },
  { name: 'Meshack Taabu Hobe', firstName: 'Meshack Taabu', lastName: 'Hobe' },
  { name: 'Methucellah Mokua Mariera', firstName: 'Methucellah Mokua', lastName: 'Mariera' },
  { name: 'Millicent Atieno Odongo', firstName: 'Millicent Atieno', lastName: 'Odongo' },
  { name: 'Millicent Atieno Ojiem', firstName: 'Millicent Atieno', lastName: 'Ojiem' },
  { name: 'Miriam Jumwa Mungai', firstName: 'Miriam Jumwa', lastName: 'Mungai' },
  { name: 'Misheck Murithi M\'mbuu', firstName: 'Misheck Murithi', lastName: 'M\'mbuu' },
  { name: 'Moffat Moturi Ombati', firstName: 'Moffat Moturi', lastName: 'Ombati' },
  { name: 'Monica Njeri Gitau', firstName: 'Monica Njeri', lastName: 'Gitau' },
  { name: 'Monicah Bosibori Mosoti', firstName: 'Monicah Bosibori', lastName: 'Mosoti' },
  { name: 'Moses Mwaya Kobia', firstName: 'Moses Mwaya', lastName: 'Kobia' },
  { name: 'Nancy Kathambi Murithi', firstName: 'Nancy Kathambi', lastName: 'Murithi' },
  { name: 'Naomi Kemuma Ondicho', firstName: 'Naomi Kemuma', lastName: 'Ondicho' },
  { name: 'Naomi Kemunto Mauti', firstName: 'Naomi Kemunto', lastName: 'Mauti' },
  { name: 'Nelly Auma Mwaya', firstName: 'Nelly Auma', lastName: 'Mwaya' },
  { name: 'Nelson Mwangi Ngarachu', firstName: 'Nelson Mwangi', lastName: 'Ngarachu' },
  { name: 'Nimrod Ochieng Odee', firstName: 'Nimrod Ochieng', lastName: 'Odee' },
  { name: 'Pamellah Aluoch', firstName: 'Pamellah', lastName: 'Aluoch' },
  { name: 'Patricia Wambui Thuku', firstName: 'Patricia Wambui', lastName: 'Thuku' },
  { name: 'Patricias Nyagothi', firstName: 'Patricias', lastName: 'Nyagothi' },
  { name: 'Patrick Daddy Okongo', firstName: 'Patrick Daddy', lastName: 'Okongo' },
  { name: 'Patrick Macharia Gatama', firstName: 'Patrick Macharia', lastName: 'Gatama' },
  { name: 'Patrick Muli Kimondiu', firstName: 'Patrick Muli', lastName: 'Kimondiu' },
  { name: 'Patrick Mwengei Wambua', firstName: 'Patrick Mwengei', lastName: 'Wambua' },
  { name: 'Patrick Njoroge Wangui', firstName: 'Patrick Njoroge', lastName: 'Wangui' },
  { name: 'Paul Ngei Mbithi', firstName: 'Paul Ngei', lastName: 'Mbithi' },
  { name: 'Paul Odongo Kisero', firstName: 'Paul Odongo', lastName: 'Kisero' },
  { name: 'Paul Omollo Obwanda', firstName: 'Paul Omollo', lastName: 'Obwanda' },
  { name: 'Pauline Adhiambo', firstName: 'Pauline', lastName: 'Adhiambo' },
  { name: 'Penuel Magwaro', firstName: 'Penuel', lastName: 'Magwaro' },
  { name: 'Peter', firstName: 'Peter', lastName: '' },
  { name: 'Peter Muinde Nzioka', firstName: 'Peter Muinde', lastName: 'Nzioka' },
  { name: 'Peter Muthuri Kirema', firstName: 'Peter Muthuri', lastName: 'Kirema' },
  { name: 'Peter Mwangi Kamau', firstName: 'Peter Mwangi', lastName: 'Kamau' },
  { name: 'Phoebe Adhiambo Ouma', firstName: 'Phoebe Adhiambo', lastName: 'Ouma' },
  { name: 'Priscah Ghati', firstName: 'Priscah', lastName: 'Ghati' },
  { name: 'Rebbecca Nyanduro Kamau', firstName: 'Rebbecca Nyanduro', lastName: 'Kamau' },
  { name: 'Renah Awuor Adhiambo', firstName: 'Renah Awuor', lastName: 'Adhiambo' },
  { name: 'Reuben Luchendo Lusasi', firstName: 'Reuben Luchendo', lastName: 'Lusasi' },
  { name: 'Rhoda Nyaboke Ongere', firstName: 'Rhoda Nyaboke', lastName: 'Ongere' },
  { name: 'Rhoda Auma Migere', firstName: 'Rhoda Auma', lastName: 'Migere' },
  { name: 'Ribin Nyamuya Morara', firstName: 'Ribin Nyamuya', lastName: 'Morara' },
  { name: 'Richard Ochako Nyandiko', firstName: 'Richard Ochako', lastName: 'Nyandiko' },
  { name: 'Risper Matundura Nyansimera', firstName: 'Risper Matundura', lastName: 'Nyansimera' },
  { name: 'Rister Nyarangi Ongang\'A', firstName: 'Rister Nyarangi', lastName: 'Ongang\'A' },
  { name: 'Robert', firstName: 'Robert', lastName: '' },
  { name: 'Ronny Barvin', firstName: 'Ronny', lastName: 'Barvin' },
  { name: 'Rose Nthenya Mbondo', firstName: 'Rose Nthenya', lastName: 'Mbondo' },
  { name: 'Roselyne Aoko Achieng\'', firstName: 'Roselyne Aoko', lastName: 'Achieng\'' },
  { name: 'Ruth Kerubo Kabuna', firstName: 'Ruth Kerubo', lastName: 'Kabuna' },
  { name: 'Sabina Fancy Nyambega', firstName: 'Sabina Fancy', lastName: 'Nyambega' },
  { name: 'Sammy Barasa Ndege', firstName: 'Sammy Barasa', lastName: 'Ndege' },
  { name: 'Samuel Mwangi Muturi', firstName: 'Samuel Mwangi', lastName: 'Muturi' },
  { name: 'Samuel Kamau Kuru', firstName: 'Samuel Kamau', lastName: 'Kuru' },
  { name: 'Samuel Macharia Nyanjui', firstName: 'Samuel Macharia', lastName: 'Nyanjui' },
  { name: 'Sarah Njoki Mugetha', firstName: 'Sarah Njoki', lastName: 'Mugetha' },
  { name: 'Sarah Abraham Malayi', firstName: 'Sarah Abraham', lastName: 'Malayi' },
  { name: 'Scholatie Tracy Akello', firstName: 'Scholatie Tracy', lastName: 'Akello' },
  { name: 'Serah', firstName: 'Serah', lastName: '' },
  { name: 'Shallon Bonareri Mangara', firstName: 'Shallon Bonareri', lastName: 'Mangara' },
  { name: 'Sharon Marion Owigo', firstName: 'Sharon Marion', lastName: 'Owigo' },
  { name: 'Sheila Akoth Otieno', firstName: 'Sheila Akoth', lastName: 'Otieno' },
  { name: 'Shem Owuor Oyugi', firstName: 'Shem Owuor', lastName: 'Oyugi' },
  { name: 'Silvia Kerubo Ombaki', firstName: 'Silvia Kerubo', lastName: 'Ombaki' },
  { name: 'Simon Moruri Kiago', firstName: 'Simon Moruri', lastName: 'Kiago' },
  { name: 'Stacy', firstName: 'Stacy', lastName: '' },
  { name: 'Stephen Mweta Ndolo', firstName: 'Stephen Mweta', lastName: 'Ndolo' },
  { name: 'Sure Joash', firstName: 'Sure', lastName: 'Joash' },
  { name: 'Sure Rhoda', firstName: 'Sure', lastName: 'Rhoda' },
  { name: 'Susan Aketch Adhiambo', firstName: 'Susan Aketch', lastName: 'Adhiambo' },
  { name: 'Sylvia Kemunto Ongere', firstName: 'Sylvia Kemunto', lastName: 'Ongere' },
  { name: 'Teddy Nduko Machoka', firstName: 'Teddy Nduko', lastName: 'Machoka' },
  { name: 'Thomas M. Jachong', firstName: 'Thomas M.', lastName: 'Jachong' },
  { name: 'Tony Ondicho Machoka', firstName: 'Tony Ondicho', lastName: 'Machoka' },
  { name: 'Tracy Nafula Soita', firstName: 'Tracy Nafula', lastName: 'Soita' },
  { name: 'Traidah Nanjala Soita', firstName: 'Traidah Nanjala', lastName: 'Soita' },
  { name: 'Trizah Nasimiyu Soita', firstName: 'Trizah Nasimiyu', lastName: 'Soita' },
  { name: 'Trybickson Wekesa Soita', firstName: 'Trybickson Wekesa', lastName: 'Soita' },
  { name: 'Valerian Kwamboka Osiemo', firstName: 'Valerian Kwamboka', lastName: 'Osiemo' },
  { name: 'Veran Bosibori Matange', firstName: 'Veran Bosibori', lastName: 'Matange' },
  { name: 'Victor Kiprotich Tanui', firstName: 'Victor Kiprotich', lastName: 'Tanui' },
  { name: 'Victorine Atieno Onyando', firstName: 'Victorine Atieno', lastName: 'Onyando' },
  { name: 'Vinicky Meroka James', firstName: 'Vinicky Meroka', lastName: 'James' },
  { name: 'Virginia Muthoni Kioko', firstName: 'Virginia Muthoni', lastName: 'Kioko' },
  { name: 'Vivian Akinyi Ouko', firstName: 'Vivian Akinyi', lastName: 'Ouko' },
  { name: 'Wendy Nyamokami Machoka', firstName: 'Wendy Nyamokami', lastName: 'Machoka' },
  { name: 'Wilson Henry Nyangosi', firstName: 'Wilson Henry', lastName: 'Nyangosi' },
  { name: 'Winnie Achieng Okumu', firstName: 'Winnie Achieng', lastName: 'Okumu' },
  { name: 'Winny Kerubo Karanja', firstName: 'Winny Kerubo', lastName: 'Karanja' },
  { name: 'Wycliffe Nyagaka Oyaro', firstName: 'Wycliffe Nyagaka', lastName: 'Oyaro' },
  { name: 'Yvonne Neema', firstName: 'Yvonne', lastName: 'Neema' },
  { name: 'Zablon Ongere Magwaro', firstName: 'Zablon Ongere', lastName: 'Magwaro' },
  { name: 'Agnes Njeri Mwangi', firstName: 'Agnes Njeri', lastName: 'Mwangi' },
  { name: 'Annasticia Mokeira Nyabuto', firstName: 'Annasticia Mokeira', lastName: 'Nyabuto' },
  { name: 'Daniel Githinji Gichimu', firstName: 'Daniel Githinji', lastName: 'Gichimu' },
  { name: 'Duncan Onsomu Nduko', firstName: 'Duncan Onsomu', lastName: 'Nduko' },
  { name: 'Edith Adhiambo Kongoro', firstName: 'Edith Adhiambo', lastName: 'Kongoro' },
  { name: 'Edna Miyaba', firstName: 'Edna', lastName: 'Miyaba' },
  { name: 'Edward Gor Kongoro', firstName: 'Edward Gor', lastName: 'Kongoro' },
  { name: 'Elam Chematan', firstName: 'Elam', lastName: 'Chematan' },
  { name: 'Eliud Muthee Kairu', firstName: 'Eliud Muthee', lastName: 'Kairu' },
  { name: 'George Omondi Okumu', firstName: 'George Omondi', lastName: 'Okumu' },
  { name: 'Grace Mukami', firstName: 'Grace', lastName: 'Mukami' },
  { name: 'Jackline Kemunto Moroga', firstName: 'Jackline Kemunto', lastName: 'Moroga' },
  { name: 'Jane Wambui Mwangangi', firstName: 'Jane Wambui', lastName: 'Mwangangi' },
  { name: 'Kelvin Osoro Mangina', firstName: 'Kelvin Osoro', lastName: 'Mangina' },
  { name: 'Layla Kwamboka Arita', firstName: 'Layla Kwamboka', lastName: 'Arita' },
  { name: 'Lilian Akoth Odhiambo', firstName: 'Lilian Akoth', lastName: 'Odhiambo' },
  { name: 'Lucy Njiru', firstName: 'Lucy', lastName: 'Njiru' },
  { name: 'Magriter Njeri Mwaura', firstName: 'Magriter Njeri', lastName: 'Mwaura' },
  { name: 'Margaret Nyarangi Kebasi', firstName: 'Margaret Nyarangi', lastName: 'Kebasi' },
  { name: 'Mutabazi Ellie', firstName: 'Mutabazi', lastName: 'Ellie' },
  { name: 'Naftal Sironga Thomas', firstName: 'Naftal Sironga', lastName: 'Thomas' },
  { name: 'Nahashon Maroria Onsongo', firstName: 'Nahashon Maroria', lastName: 'Onsongo' },
  { name: 'Rael Karimi Maore', firstName: 'Rael Karimi', lastName: 'Maore' },
  { name: 'Rebecca Nyambane Magara', firstName: 'Rebecca Nyambane', lastName: 'Magara' },
  { name: 'Ruth Nyanchama Oganga', firstName: 'Ruth Nyanchama', lastName: 'Oganga' },
  { name: 'Shadrack Omariba Ongubo', firstName: 'Shadrack Omariba', lastName: 'Ongubo' },
  { name: 'Sheilla Cheptoo', firstName: 'Sheilla', lastName: 'Cheptoo' },
  { name: 'Stephen Ondwari Ohuru', firstName: 'Stephen Ondwari', lastName: 'Ohuru' },
  { name: 'Susan Syombua Nduleve', firstName: 'Susan Syombua', lastName: 'Nduleve' },
  { name: 'Sylvia Kerubo Nyambane', firstName: 'Sylvia Kerubo', lastName: 'Nyambane' },
  { name: 'Teresiah Kamau', firstName: 'Teresiah', lastName: 'Kamau' },
  { name: 'Tresky Amondi Ojwang', firstName: 'Tresky Amondi', lastName: 'Ojwang' },
  { name: 'Treza Faith Odongo', firstName: 'Treza Faith', lastName: 'Odongo' },
  { name: 'Viola Moraa Omare', firstName: 'Viola Moraa', lastName: 'Omare' },
  { name: 'Warren Pope Junior', firstName: 'Warren Pope', lastName: 'Junior' },
  { name: 'Wilson Ssebandeke', firstName: 'Wilson', lastName: 'Ssebandeke' },
  { name: 'Irungu Mwangi Joseph', firstName: 'Irungu Mwangi', lastName: 'Joseph' }
]

// Function to generate membership number
const generateMembershipNumber = (index) => {
  const year = new Date().getFullYear()
  const number = String(index + 1).padStart(3, '0')
  return `TM-${year}-${number}`
}

// Function to populate members into the database
export const populateChurchMembers = async () => {
  try {
    console.log('Starting church members population...')
    
    // Prepare member data for insertion
    const membersData = churchMembers.map((member, index) => ({
      membership_number: generateMembershipNumber(index),
      first_name: member.firstName,
      last_name: member.lastName,
      is_active: true,
      membership_date: '2025-01-01',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    // Insert members in batches to avoid timeout
    const batchSize = 50
    const batches = []
    
    for (let i = 0; i < membersData.length; i += batchSize) {
      batches.push(membersData.slice(i, i + batchSize))
    }

    console.log(`Inserting ${membersData.length} members in ${batches.length} batches...`)

    let totalInserted = 0
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i]
      console.log(`Inserting batch ${i + 1}/${batches.length} (${batch.length} members)...`)
      
      const { data, error } = await supabase
        .from('members')
        .insert(batch)
        .select()

      if (error) {
        console.error(`Error inserting batch ${i + 1}:`, error)
        throw error
      }

      totalInserted += data.length
      console.log(`✅ Batch ${i + 1} completed. Inserted ${data.length} members.`)
    }

    console.log(`🎉 Successfully populated ${totalInserted} church members!`)
    
    // Return summary
    return {
      success: true,
      totalMembers: totalInserted,
      message: `Successfully populated ${totalInserted} church members into the database.`
    }

  } catch (error) {
    console.error('Error populating church members:', error)
    return {
      success: false,
      error: error.message,
      message: 'Failed to populate church members. Please check the console for details.'
    }
  }
}

// Function to check if members already exist
export const checkExistingMembers = async () => {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('membership_number')
      .like('membership_number', 'TM-2025-%')

    if (error) {
      console.error('Error checking existing members:', error)
      return { count: 0, error }
    }

    return { count: data.length, members: data }
  } catch (error) {
    console.error('Error checking existing members:', error)
    return { count: 0, error }
  }
}

// Function to clear existing members (use with caution)
export const clearExistingMembers = async () => {
  try {
    console.log('⚠️ Clearing existing members with TM-2025- prefix...')
    
    const { data, error } = await supabase
      .from('members')
      .delete()
      .like('membership_number', 'TM-2025-%')
      .select()

    if (error) {
      console.error('Error clearing existing members:', error)
      throw error
    }

    console.log(`✅ Cleared ${data.length} existing members.`)
    return { success: true, cleared: data.length }
  } catch (error) {
    console.error('Error clearing existing members:', error)
    return { success: false, error: error.message }
  }
}

export default {
  populateChurchMembers,
  checkExistingMembers,
  clearExistingMembers,
  churchMembers
}