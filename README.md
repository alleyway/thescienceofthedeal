#  The Science of The Deal Website

This site is modified by checking out this source repository from GitHub, modifying, and "pushing" ba  

### First time setup:
Make sure you have Ruby (2.4.+) installed

    ruby --version

Install/Update Ruby from here: https://www.ruby-lang.org/en/documentation/installation/ 

TROUBLESHOOTING: Is the terminal still using the old ruby version? Try installing RVM(Ruby Version Manager) with this:

    \curl -L https://get.rvm.io | bash -s stable
    rvm install ruby-2.4.0

Install npm: 


Make sure you have RubyGems installed: https://rubygems.org/pages/download

    gem install bundler
    git clone git@github.com:alleywayconsulting/thescienceofthedeal.git
    cd thescienceofthedeal
    bundle install

    npm install -g bower
    bower install
    
Troubleshooting: Issues installing 'nokogiri' on OSX: make sure you have xcode command line tools installed and license agreed to

### Local development
Run the following in the check-out directory to spin up jekyll live compiler

    bundle exec jekyll serve
    
Modify code and instantly see changes on your local machine(typically at http://localhost:4000/ ) 

(JetBrains IDE was used for development but is not essential)     
     
### Publishing live
    
    git commit . -m "my commit message"
    git push origin

### Other tools

Domain names hosted at Godaddy under Alleyway's account

DNS, SSL and caching provided by Cloudflare under Alleyway's account

Site has Google Analytics tracking at [https://www.google.com/analytics/]

