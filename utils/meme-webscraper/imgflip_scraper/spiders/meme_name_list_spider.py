import scrapy
import csv
from pathlib import Path
from functools import reduce
import os

class GenerateSpider(scrapy.Spider):
    name = "meme_names"
    save_path = os.getcwd()


    def start_requests(self):
        global memeNames
        memeNames=[
        ]
        memeCounterTemp=0;

        urls = []
        for i in range(5):
            urls.append('https://imgflip.com/memetemplates?page='+str(i+1))
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def get_memes(self, response, fieldnames):
        rows = response.css('#page table tr')[1:]
        self.log('rows %s' % rows)
        for row in rows:
            self.log('row %s' % row)
            _row = row.css('td::text').extract()
            self.log('_row %s' % _row)
            meme = {
                fieldnames[0]: _row[0],
                fieldnames[1]: _row[1]
            }
            if len(_row) > 2:
                meme[fieldnames[2]] = _row[2]

            meme = meme+"test";
            yield meme

    def parse(self, response):
        global memeNames;


        #fieldnames = response.css('html body.page-full-width.fixed-header div#page div#mt-boxes-wrap.ibox div.mt-boxes div.mt-box h3.mt-title a::text').getall()
        fieldnames = response.css('html body.page-full-width.fixed-header div#page div#mt-boxes-wrap.ibox div.mt-boxes div.mt-box h3.mt-title a::attr(href)').getall()
        #fieldnames = response.css('html body.page-full-width.fixed-header div#page div#mt-boxes-wrap.ibox div.mt-boxes div.mt-box h3.a[href^="https"]::text').getall()
        #fieldnames = response.css('a[href^="https"]::text').getall()

        #nameString = "test"
        #fieldnames.insert(0,nameString)


        filename = reduce(os.path.join, [self.save_path, "dataset", 'meme_names.csv'])
        Path(os.path.dirname(filename)).mkdir(mode=0o655, parents=True, exist_ok=True)

        with open(filename, 'a', newline='') as file:

            self.log('Created File %s' % filename)
            writer = csv.DictWriter(file, fieldnames=fieldnames, quoting=csv.QUOTE_ALL)
            writer.writeheader()

