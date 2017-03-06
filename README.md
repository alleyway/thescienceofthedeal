#  The Science of The Deal Website

This site is modified by checking out this source repository from GitHub, modifying, and "pushing" ba  

### First time setup:
Make sure you have RubyGems installed: https://rubygems.org/pages/download

    gem install bundler
    git clone git@github.com:alleywayconsulting/thescienceofthedeal.git
    bundle install
    
    gem install bower
    bower install
    
Troubleshooting: Issues installing 'nokogiri' on OSX: make sure you have xcode command line tools installed and license agreed to

### Local development
Run the following to spin up jekyll live compiler

    bundle exec jekyll serve
    
Modify code and instantly see changes on your local machine(typically at http://localhost:4000/ ) 
     
### Publishing live
    git commit .

### Other tools

Domain names hosted at Godaddy under Alleyway's account

DNS, SSL and caching provided by Cloudflare under Alleyway's account

Site has Google Analytics tracking at [https://www.google.com/analytics/]

