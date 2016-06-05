from app import db
db.create_all()

from app import Task
Water = Task('Нарисуйте молекулу воды (H20)', '[H][O][H]')
SulfuricAcid = Task('Нарисуйте серную кислоту (H2SO4)', '[H][O][S](=O)(=O)[O][H]')

db.session.add(Water)
db.session.add(SulfuricAcid)

db.session.commit()
