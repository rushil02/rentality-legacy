import traceback

from allauth.socialaccount.models import SocialApp
from django.contrib.flatpages.models import FlatPage
from django.core.management.base import BaseCommand, CommandError
from django.contrib.sites.models import Site
from django.db.utils import IntegrityError

from elastic_search.core.utils import get_index, create_mappings
from house.models import Tag, RoomType
from django.conf import settings


def create_site():
    # FIXME: site obj relation

    site_obj, s_created = Site.objects.get_or_create(domain='rentality.com', name='Rentality')
    return site_obj


def social_apps_info(site_obj):
    """ Creates OAuth api token information for django-allauth """

    providers = settings.OAUTH_DETAILS

    for provider in providers:
        obj, created = SocialApp.objects.get_or_create(
            provider=provider,
            name=providers[provider]['verbose'],
            secret=providers[provider]['secret'],
            client_id=providers[provider]['client_id']
        )

        obj.sites.add(site_obj)


def create_tags():  # TODO: Set all tags here
    """ Creates all house tags here """

    Tag.objects.get_or_create(verbose="No Smoking", tag_type='R')
    Tag.objects.get_or_create(verbose="Wifi included", tag_type='F')
    Tag.objects.get_or_create(verbose="Furnished", tag_type='F')
    Tag.objects.get_or_create(verbose="Pets Friendly", tag_type='R')


def create_room__types():
    """ Creates all property types here """
    RoomType.objects.get_or_create(name="Whole Apartment")
    RoomType.objects.get_or_create(name="Whole House")
    RoomType.objects.get_or_create(name="Room in Share-house with Private bathroom")
    RoomType.objects.get_or_create(name="Room in Share-house with Shared bathroom")
    RoomType.objects.get_or_create(name="Student Accommodation")
    RoomType.objects.get_or_create(name="Home Stay")
    RoomType.objects.get_or_create(name="Granny Flat")
    RoomType.objects.get_or_create(name="Other")


# TODO
def add_flat_pages(site_obj):
    obj, cr = FlatPage.objects.get_or_create(
        url='/tos/',
        title='Terms of Service',
        content="""
        
The website located at http://www.rentality.com.au, including any of its sub-domains or sections (henceforth referred to as 'the Website') is operated by Rentality (henceforth referred to as 'We'). These terms and conditions of Service (henceforth referred to as 'the Terms') regulate how access to, and use of the Website, or any of its associated Services, by the Website visitors (henceforth referred to as 'You') will be managed, in the framework of the services provided by the Website (henceforth referred to as 'the Services'). Rentality’s Terms of Service are available at http://www.rentality.com.au/terms (henceforth referred to as 'the Terms Page'). Any use of the above terminology or other words in the singular, plural and capitalisation are taken as interchangeable and therefore as referring to same.
 
 
 
Sections of the Terms of Service:
 
1. About the Terms
2. Your obligations as a user
3. Privacy and Copyright Protection
4. Our Warranties and Disclaimers
5. Limitation of liability
6. Termination of Services
 
 
 
1. About the Terms
 
1.1.
By using, browsing and/or reading the Website, this signifies that you have read, understood and agree to be bound by the Terms. If you do not agree with the Terms, you must cease usage of the Website, or any of the Services, immediately.

 
1.2.
Rentality reserves the right to review and change any of the Terms by updating the Terms Page at its sole discretion. When Rentality updates the Terms, changes will not apply retroactively and will become effective in seven days after they are posted. However, changes related to new functions or changes made for legal reasons will be effective immediately. You should review the terms regularly to monitor any changes.

 
1.3.
These terms control the relationship between Rentality and you. They do not create any third party beneficiary rights.

 
1.4.
If you do not comply with these terms, and we do not take action right away, this does not mean that we are giving up any rights that we may have (such as taking action in the future). 

 
1.5.
If any part of these Terms is found to be void or unenforceable by a Court of competent jurisdiction, that part shall be severed and the rest of the Terms shall remain in force.

 
1.6.
The Terms are governed by the laws of Australia Capital Territory, Australia. Any dispute, controversy, proceeding or claim of whatever nature arising out of or in any way relating to the Terms and the rights created hereby shall be governed, interpreted and construed by, under and pursuant to the laws of Australia Capital Territory, Australia.
 
 
 
2. Your obligations as a user
 
2.1.
As a user, you agree to comply with the following:
 
(a)
you will use the Services only for purposes that are permitted by the Terms and any applicable law, regulation or generally accepted practices or guidelines in the relevant jurisdictions;
 
(b)
access and use of the Website is limited, non-transferable and allows for the sole use of the Website by you for the purposes of Rentality providing the Services;
 
(c)
you will not use the Services or Website for any illegal and/or unauthorised use which includes unauthorised framing of or linking to the Website;
 
(d)
you acknowledge and agree that any automated use of the Website or its Services is prohibited.
 
 
 
3. Privacy and Copyright Protection
 
3.1.
Rentality takes your privacy seriously and any information provided through your use of the Website and/or Services is subject to Rentality’s Privacy Policy, which is available on the website.

 
3.2.
All trademarks, service marks and trade names are owned, registered and/or licenced by Rentality. The Website and the Services of Rentality are subject to copyright. The material on the Website is protected by copyright under the laws of Australia and through international treaties. Unless otherwise indicated, all rights (including copyright) in the Services and compilation of the Website (including but not limited to text, graphics, logos, button icons, video, images, audio clips, Website, code, scripts, design and interactive features) are owned or controlled for these purposes, and are reserved by Rentality or its partners.

 
3.3.
Rentality grants you a personal, worldwide, non-exclusive, royalty-free, revocable license to be used for the sole purpose of enabling you to use the Services. This license is limited to the use of the Website pursuant to the Terms. Rentality does not grant you any other rights whatsoever in relation to the Website or the Services. All other rights are expressly reserved by Rentality.

 
3.4.
Rentality retains all rights, title and interest in and to the Website and all related Services. Nothing you do on or in relation to the Website will transfer or grant the right to use or exploit:
 
(a)
a business name, trading name, domain name, trademark, design, patent or copyright, or
 
(b)
a thing, system or process that is the subject of copyright (or an adaptation or modification of such a thing, system or process),
 
 
to you.

 
3.5.
You may not, without the prior written permission of Rentality and the permission of any other relevant rights owners: copy, modify, distribute, sell, lease, broadcast, republish, upload to a third party, transmit, post, distribute, show or play in public, adapt or change in any way our Services or third party Services for any purpose, unless otherwise provided by these Terms.
 
 
 
4. Our Warranties and Disclaimers
 
4.1.
Nothing in the Terms limits or excludes any guarantees, warranties, representations or conditions implied or imposed by law, including the Australian Consumer Law (or any liability under them) which by law may not be limited or excluded.

 
4.2.
Subject to this clause, and to the extent permitted by law:
 
(a)
all terms, guarantees, warranties, representations or conditions which are not expressly stated in the Terms are excluded; and
 
(b)
Rentality will not be liable for any special, indirect or consequential loss or damage, loss of profit or opportunity, or damage to goodwill arising out of or in connection with the Services or these Terms (including as a result of not being able to use the Services or the late supply of the Services), whether at common law, under contract, tort (including negligence), in equity, pursuant to statute or otherwise.

 
4.3.
Use of the Website and the Services is at your own risk. Everything on the Website and the Services is provided to you "AS IS" and "AS AVAILABLE" without warranty or condition of any kind. None of the affiliates, directors, officers, employees, agents, contributors and licensors of Rentality make any express or implied representation or warranty about any Services (including the Services of Rentality) referred to on the Website. This includes (but is not restricted to) loss or damage you might suffer as a result of any of the following:
 
(a)
failure of performance, error, omission, interruption, deletion, defect, failure to correct defects, delay in operation or transmission, computer virus or other harmful component, loss of data, communication line failure, unlawful third party conduct, or theft, destruction, alteration or unauthorised access to records;
 
(b)
the accuracy, suitability or currency of any information on the Website, the Services or any of the Services related products (including third party material and advertisements on the Website);
 
(c)
costs incurred as a result of you using the Website, the Services or any of the Services related products; and
 
(d)
the Services or operation in respect to Third-party links which are provided for your convenience
 
 
 

 
 
5. Limitation of liability
 
5.1.
Rentality’s total liability arising out of or in connection with the Services or these Terms, however arising, including under contract, tort (including negligence), in equity, under statute or otherwise, will not exceed the resupply of the Services to you.

 
5.2.
You expressly understand and agree that Rentality, its affiliates, employees, agents, contributors and licensors shall not be liable to you for any direct, indirect, incidental, special consequential or exemplary damages which may be incurred by you, however caused and under any theory of liability. This shall include, but is not limited to, any loss of profit (whether incurred directly or indirectly), any loss of goodwill or business reputation and any other intangible loss.
 
 
 
6. Termination of Services
 
6.1.
The Terms will continue to apply until terminated by either you or by Rentality as set out below.

 
6.2.
If you want to terminate the Terms, you may do so by providing Rentality with 7 days' notice of your intention to terminate; and stopping your use of the website immediately. Your notice should be sent, in writing, to Rentality via the methods available on the 'Contact' link on our homepage.

 
6.3.
Rentality may also stop providing Services to you, or add or create new limits to our Services at any time.

 
6.4.
Subject to the laws of Australia, Rentality reserves the right to terminate the Terms at any time and may suspend or deny, in its sole discretion, your access to all or any portion of the Website or the Services without notice if:
 
(a)
Rentality is required to do so by law;
 
(b)
the provision of the Services to you by Rentality is, in the opinion of Rentality, no longer commercially viable.

        """
    )
    obj.sites.add(site_obj)

    obj, cr = FlatPage.objects.get_or_create(
        url='/priv-policy/',
        title='PRIVACY POLICY',
        content="""
        
This policy covers Rentality and its use of personal information collected when you use the rentality.com.au website. This privacy policy is regularly reviewed and Rentality may amend it from time to time. While Rentality will endeavour to notify you of any major changes to this Privacy Policy from time to time, you agree that you will periodically review the most up-to-date version of this Privacy Policy available. 

The policy also gives you information about cookies, Rentality’s and third parties’ use of cookies and how you reject cookies.You will be asked to submit personal information about yourself (e.g. name and email address) in order to register to receive or use services on rentality.com.au. Such services include newsletters, live chats, message boards and other future developments By entering your details, you enable Rentality and its service providers to provide you with the services you select. Whenever you provide personal information, we will treat it in accordance with this policy. When using your personal information Rentality will act in accordance with current legislation and aim to meet current Internet best practice.

1. Visitor Data. 
During the course of any visit to rentality.com.au the pages you see pass data via a short text file called a ‘cookie’, to your computer. Most websites do this, because cookies enable website publishers to ascertain whether the computer has visited the website before. This is done on a subsequent visit by detecting the cookie left there previously. From time to time we may use the services of research companies to gather non-personal data regarding the users of our website using cookies, log file data and code embedded on our site. Information supplied by cookies helps us to improve your online user experience and allows us to profile how users navigate the site. If you wish to reject cookies please contact Rentality at admin@rentality.com.au.

2. Third Party Advertising. 
Advertisements appearing on this Web site may be served by Rentality or one of our Web advertising partners. Our Web advertising partners may set cookies. These cookies allow the ad server to recognize your computer each time you click an online advertisement. In this way, ad servers may compile information about when you, or others using your computer, saw advertisements and which ads are clicked. This allows an advertisement network to deliver targeted advertisements that they believe will be of most interest to you.

3. What is a cookie? 
A cookie is a small amount of data sent to your browser from a website’s computer and stored on your computer’s hard drive. Each website can send its own cookie to your browser if your browser’s preferences allow it, but your browser only permits a web site to access the cookies it has sent to you, not cookies sent by other sites. Most sites do this whenever a user visits their website in order to track online traffic flows. Users can set their computers to accept cookies, to notify when a cookie is issued, or not to receive cookies. Browsers vary so it is advisable to check the “Help” menu of your browser to learn how to change your cookie preferences.

4. Use and storage of your personal information. 
When you supply any personal information to Rentality we have legal obligations towards you in the way we use the data. We must explain how we will use it and tell you if we want to pass the information on to anyone else. In general and subject to the terms of this Privacy policy, any information you provide to Rentality will only be used within Rentality and by its agents and service providers. Your information will be disclosed only where we are obliged to do so or permitted to do so by law. Also, if you post or send offensive, inappropriate or objectionable content anywhere on rentality.com.au or otherwise engage in any disruptive behaviour on rentality.com.au, Rentality may use whatever information available to it about you to stop such behaviour. This may involve informing relevant third parties such as law enforcement agencies about the content you have posted. We will hold your personal information for as long as you use the rentality.com.au services, and remove it when you no longer wish to continue your registration. Rentality may store messaging transcript data (including message content, member names, times and dates) arising from the use of rentality.com.au community services for a period of six months. We will ensure that all personal information supplied is held securely, in accordance with the relevant privacy laws. If you are notified on the rentality.com.au site that your information may be used to allow Rentality to contact you for “service administration purposes”, this means we may contact you for a number of purposes related to our service. For example, we may wish to provide you with password reminders or notify you that the particular service has been suspended for maintenance.

5. Sharing and Disclosure of Information. 
Rentality reserves the right to transfer personal information to a successor in interest that acquires rights to that information as a result of the sale of Rentality or substantially all of its assets to that successor in interest. For more information see the “Changes to Our Privacy Policy” section below.

6. Changes in Our Privacy Policy. 
From time to time we may make changes to our privacy policy and will post them on the rentality.com.au website. A User is bound by any changes to the policy when he or she uses the site after those changes have been posted.

7. Access to your personal information. 
You have the right to request a copy of the personal information Rentality holds about you and to have any inaccuracies corrected. (please note that due to administration costs, Rentality will charge $20 for information requests.) Please address requests to Rentality at admin@rentality.com.au.

8. Minors
Users who are minors. If you are under 13 or a minor under applicable law please obtain your parent/guardian’s permission beforehand whenever you provide personal information to the rentality.com.au website. Users without this consent are not permitted to provide us with personal information.

9. Contact Details
admin@rentality.com.au
        """)
    obj.sites.add(site_obj)



# def initialze_es():
#     get_index()
#     create_mappings()


class Command(BaseCommand):
    """ Initialize website db with data """

    help = 'Initialize website with settings and details data'

    web_init_func = {
        'Integrate OAuth info': (social_apps_info, True),
        'Create tags': (create_tags, False),
        'Add flat pages': (add_flat_pages, True),
        'Create Property Type (room_type) choices': (create_room__types, False),
        # 'Initialize ElasticSearch Mappings': initialze_es,
    }

    def ask_user_input(self, verbose):
        opt = input(verbose + " ? [y/n]\n")
        if opt in ['y', 'Y']:
            return True
        elif opt in ['n', 'N']:
            return False
        else:
            print("Invalid option.\n")
            return self.ask_user_input(verbose)

    def handle(self, *args, **options):
        try:
            site_obj = create_site()
            for verbose, func in self.web_init_func.items():
                if self.ask_user_input(verbose):
                    if func[1]:
                        func[0](site_obj)
                    else:
                        func[0]()
        except KeyError as e:
            print(e)
            traceback.print_stack()
            raise CommandError("Some problem occurred. Rolling back changes.")
        # except IntegrityError:
        #     raise CommandError("Problem with sites module")
        else:
            self.stdout.write("Website initialized with data")
